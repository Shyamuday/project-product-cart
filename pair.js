class Pair extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.pairText = this.getAttribute('pair-text') || '';
    this.originalPrice = this.getAttribute('original-price') || '';
    this.discountedPrice = this.getAttribute('discounted-price') || '';
    this.discount = this.getAttribute('discount') || '';
    this.mostPopular = this.hasAttribute('most-popular');
    this.noOfOptions = this.getAttribute('no-of-options');
    this.isSelected = this.hasAttribute('selected');


    this.shadowRoot.innerHTML = `
  <link rel="stylesheet" href="styles.css">
  <div class="main-content-container">
   <div class="pair-content-container">
    <div class="pair-container"> 
      <div class="top-container">
      <div class="left-container">
        <div class="pair-option">
          <input id="radioId" type="radio"  ${this.isSelected ? 'checked' : ''} value="${this.pairText}" name="pair-option">
        </div>
        <div class="left-content">
          <span class="pair-text">${this.pairText}</span>
          <div class="price">
            ${this.originalPrice}
            ${this.discountedPrice ? `<span class="discounted-price">${this.discountedPrice}</span>` : ''}
          </div>
        </div> 
        </div>
            <div class="discount-percentage">
             ${this.mostPopular ? '<span class="most-popular-label">Most Popular</span>' : ''}
             ${this.discount ? `${this.discount}<br>` : ''}
            </div>
        </div>
      </div>
      <div class="dropdown-main-container" id="dropdownContainer" style="${this.isSelected ? 'display: block;' : 'display: none;'}">
         ${this.getColorOptionsHTML(this.noOfOptions)}
      </div>
    </div>
  </div>
`;
    const radioOption = this.shadowRoot.getElementById('radioId')

    if (radioOption) {
      radioOption.addEventListener('change', (event) => {
        const dropdownContainer = this.shadowRoot.getElementById('dropdownContainer');
        if (dropdownContainer) {
          dropdownContainer.style.display = 'block';
          this.closeOtherDropdowns(dropdownContainer);
        }
      })
    }
  }

  // closeOtherDropdowns(currentDropdown) {
  //   console.log('current', currentDropdown);
  //   const allDropdownContainers = this.shadowRoot.querySelectorAll('.dropdown-main-container');

  //   allDropdownContainers.forEach(container => {
  //     console.log('container', container);
  //     if (container !== currentDropdown) {
  //       container.style.display = 'none';
  //     }
  //   });
  // }

  getColorOptionsHTML(totalOptions) {
    const optionPrefix = `
    <div class="dropdown-container">
      <div class="dropdown-label">
        <label>Size</label>
        <label class="dropdown-label">Color</label>
      </div>
      <div class="dropdown-main-container">`
    const optionSuffix = `</div> </div>`;

    let options = '';

    for (let i = 1; i <= totalOptions; i++) {
      options += this.generateDropdown(i);
    }

    return `${optionPrefix} ${options} ${optionSuffix}`
  }

  generateDropdown(id) {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Colour', 'Red', 'Blue', 'Green', 'Yellow'];

    let sizeOptionsHTML = '';
    let colorOptionsHTML = '';

    for (let size of sizes) {
      sizeOptionsHTML += `<option value="${size}">${size}</option>`;
    }

    for (let color of colors) {
      colorOptionsHTML += `<option value="${color}">${color}</option>`;
    }

    return `
    <div class="dropdown">
      <label class="">#${id}</label>
      <select class="dropdown-select">
        ${sizeOptionsHTML}
      </select>
      <select class="dropdown-select">
        ${colorOptionsHTML}
      </select>
    </div>
  `;
  }
}

customElements.define('pair-element', Pair);

