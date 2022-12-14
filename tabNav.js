
{
  'use strict';
  const data = {
    "cities": [
      {
        "section": "cupertino",
        "label": "Cupertino"
      },
      {
        "section": "new-york-city",
        "label": "New York City"
      },
      {
        "section": "london",
        "label": "London"
      },
      {
        "section": "amsterdam",
        "label": "Amsterdam"
      },
      {
        "section": "tokyo",
        "label": "Tokyo"
      },
      {
        "section": "hong-kong",
        "label": "Hong Kong"
      },
      {
        "section": "sydney",
        "label": "Sydney"
      }
    ]
  };
  const cities = data.cities;
  const container = document.getElementById('cities');
  const nav = createElement('nav', ['slider-nav']);
  const menu = createElement('menu');
  const marker = createElement('div', ['marker']);

  function init() {
    cities.forEach((city, i) => {
      let item = createElement('li');
      let link = createElement('a');
      link.textContent = city.label;
      link.href = `#${city.section}`;
      // set click handler to update the tab state
      link.addEventListener('click', e => {
        e.preventDefault();
        setMarker(e.target);
      })
      // attach nodes to parent nodes
      item.appendChild(link);
      menu.appendChild(item);
    });
    // attach nodes to parent nodes
    nav.append(menu, marker);
    container.append(nav);

    // set marker to first city on load
    setMarker(menu.childNodes[0].childNodes[0]);
  }
  /*
    expects an anchor element
  */
  function setMarker(el) {
    // there should only be one "active" tab
    let activeTab = menu.querySelector('.active');
    if (activeTab) activeTab.classList.remove('active');
    el.classList.add('active');
    // get the width of the anchor that was clicked
    let width = `${el.clientWidth}px`;
    // get the left offset of the anchor that was clicked
    let left = `${el.offsetLeft}px`;

    // set the width and left style properties to activate the transition
    marker.style.width = width;
    marker.style.left = left;
  }
  /*
  tag is a required string as an element name 
  classes is optional, expects an array with one or more strings
  id is an optional string
  */
  function createElement(tag, classes, id) {
    el = document.createElement(tag);
    if(classes) {
      classes.forEach(className => {
        el.classList.add(className);
      });
    }
    if(id) {
      el.id = id;
    }
    return el;
  }

  // run init on load
  document.addEventListener('DOMContentLoaded', () => {
    init();
  });
}