let currentImage = null;

let localStorageKey = 'disabled_image'

const date = document.querySelector('.date');

const count = document.querySelector('.count');

const restore = document.querySelector('.restore-image');

const images = document.querySelectorAll('.main__img');

const closeButton = document.querySelector('.close-icon');

const deleteButton = document.querySelector('.delete-icon');

const popup = document.querySelector('.main__pop-up');

const popupImage = document.querySelector('.main__pop-up-img');

date.innerHTML = new Date().toString();

images.forEach(image => {
    const disabledImages = JSON.parse(localStorage.getItem(localStorageKey));

    if (disabledImages) {
        const src = image.getAttribute('src');
        const isDisabled = disabledImages.includes(src);

        if (isDisabled) {
            image.classList.add('disabled');
        }
    }

    image.addEventListener('click', () => {
        currentImage = image;

        popup.style.display = 'block';
        popupImage.src = image.getAttribute('src');
    });

    count.innerHTML = String(images.length);
});

closeButton.addEventListener('click', () => {
    currentImage = null;

    popup.style.display = 'none';
    popupImage.src = '';
});

deleteButton.addEventListener('click', () => {
    images.forEach(image => {
        const src = image.getAttribute('src');
        const currentSrc = currentImage.getAttribute('src');

        if (src === currentSrc) {
            image.classList.add('disabled');

            const disabledImages = JSON.parse(localStorage.getItem(localStorageKey));

            if (disabledImages) {
                disabledImages.push(currentImage.getAttribute('src'));
                localStorage.setItem(localStorageKey, JSON.stringify(disabledImages));
            } else {
                localStorage.setItem(localStorageKey, JSON.stringify([currentImage.getAttribute('src')]));
            }
        }
    });

    popup.style.display = 'none';
    popupImage.src = '';

    const disabledImages = JSON.parse(localStorage.getItem(localStorageKey));
    count.innerHTML = String(images.length - disabledImages.length);
});

restore.addEventListener('click', () => {
    localStorage.removeItem(localStorageKey);

    images.forEach(image => {
        const isDisabled = image.classList.contains('disabled');

        if (isDisabled) {
            image.classList.remove('disabled');
        }
    });
});

setInterval(() => {
    date.innerHTML = new Date().toString();
}, 1000);
