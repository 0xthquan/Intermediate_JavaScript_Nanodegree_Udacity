// import { response } from 'express';
// import Immutable from 'immutable';

let store = Immutable.Map({
    user: Immutable.Map({ name: 'Student' }),
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roverImages: '',
});

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (state, newState) => {
    store = state.merge(newState);
    render(root, store);
};

const render = (root, state) => {
    root.innerHTML = App(state, renderRoverInfo, renderRoverPhoto);
};

const renderRoverInfo = (roverInfo) => ` 
        <figure>
            <img src="./assets/images/${roverInfo.name.toLowerCase()}.jpeg" class="main-rover-img"/>
            <p><strong>Rover name:</strong> ${roverInfo.name}</p>
            <p><strong>Launch date:</strong> ${roverInfo.launch_date}</p>
            <p><strong>Landing date:</strong> ${roverInfo.landing_date}</p>
            <p><strong>Status:</strong> ${roverInfo.status}</p>
        </figure>
    `;

const renderRoverPhoto = (roverPhotos) => {
    let renderPhoto =
        '<div class = "header">Most recently available photos</div>';
    roverPhotos.forEach((photo, index) => {
        if (index > 2) {
            return;
        }
        renderPhoto += ` 
        <figure class="image-card">
            <img src="${photo.img_src}" alt="Rover image" class="rover-image"/>
            <figcaption>
                <span><b>Sol (Mars days):</b> ${photo.sol}</span><br/>
                <span><b>Earth date:</b> ${photo.earth_date}</span>
            </figcaption>
        </figure>
        `;
    });
    return renderPhoto;
};

// create content
const App = (state, renderRoverInfo, renderRoverPhoto) => {
    const { roverImages } = state.toJS();
    return renderUI(roverImages, renderRoverInfo, renderRoverPhoto);
};

const renderUI = (roverImages, renderRoverInfo, renderRoverPhoto) => {
    const images = roverImages.map((image) => ({
        earth_date: image.earth_date,
        img_src: image.img_src,
        sol: image.sol,
    }));
    showLoading(false);
    return `
        <div>
            <div class="info-container">
                ${renderRoverInfo(roverImages[0].rover)}
            </div>
            <section class="image-container">
                ${renderRoverPhoto(images)}
            </section>
        </div>
    `;
};

function changeRover() {
    const listTab = document.querySelectorAll('.tab');
    listTab.forEach((tab) => {
        tab.addEventListener('click', async () => {
            try {
                showLoading(true);
                const currentTab = tab;
                activeTab(listTab, currentTab);
                await getRoverImages(currentTab.id);
            } catch (error) {
                console.log(error);
            }
        });
    });
}

const activeTab = (tabs, currentTab) => {
    tabs.forEach((tab) => {
        if (tab.id === currentTab.id) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
};

const showLoading = (isLoading) => {
    const loadingSection = document.getElementById('loading-section');
    const mainSection = document.getElementById('root');
    loadingSection.style.display = isLoading ? 'block' : 'none';
    mainSection.style.display = isLoading ? 'none' : 'block';
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    try {
        changeRover();
        showLoading(true);
        await getRoverImages('curiosity');
    } catch (error) {
        console.log(error);
    }
});

// ------------------------------------------------------  COMPONENTS

// ------------------------------------------------------  API CALLS

const getRoverImages = async (roverName) => {
    try {
        const response = await fetch(
            `http://localhost:3000/roverPhoto/${roverName}`
        );
        const roverData = await response.json();
        const roverImages = roverData.latest_photos;
        const newState = { roverImages };
        updateStore(store, newState);
    } catch (error) {
        console.log(error);
    }
};
