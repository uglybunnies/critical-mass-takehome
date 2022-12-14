
{
  'use strict';
  const data = {
    "cities": [
      {
        "section": "cupertino",
        "label": "Cupertino",
        "timezone": "America/Los_Angeles"
      },
      {
        "section": "new-york-city",
        "label": "New York City",
        "timezone": "America/New_York"

      },
      {
        "section": "london",
        "label": "London",
        "timezone": "Europe/London"

      },
      {
        "section": "amsterdam",
        "label": "Amsterdam",
        "timezone": "Europe/Brussels"
      },
      {
        "section": "tokyo",
        "label": "Tokyo",
        "timezone": "Asia/Tokyo"
      },
      {
        "section": "hong-kong",
        "label": "Hong Kong",
        "timezone": "Asia/Hong_Kong"
      },
      {
        "section": "sydney",
        "label": "Sydney",
        "timezone": "Australia/Sydney"
      }
    ]
  };
  const cities = data.cities;
  const container = document.getElementById('cities');
  const nav = createElement('nav', ['slider-nav']);
  const menu = createElement('menu');
  const marker = createElement('div', ['marker']);
  const cityContainer = createElement('div', ['cities']);

  function init() {
    cities.forEach((city, i) => {
      let item = createElement('li');
      let link = createElement('a');
      let header = createElement('h2');
      let localTime = createElement('span');
      let  cityContent = createElement('div',['city'], city.section);
      header.textContent = link.textContent = city.label;
      // set time to display
      localTime.textContent = `, ${zoneTime(city.timezone)}`;
      link.href = `#${city.section}`;

      // set click handler to update city display
      link.addEventListener('click', e => {
        e.preventDefault();
        setMarker(e.target);
        // update time to display
        localTime.textContent = `, ${zoneTime(city.timezone)}`;
        showCityInfo(i);
      })

      // attach nodes to parent nodes
      item.appendChild(link);
      menu.appendChild(item);
      header.appendChild(localTime);
      cityContent.appendChild(header);
      cityContainer.appendChild(cityContent);
    });

    nav.append(menu, marker);
    container.append(nav, cityContainer);
    // place the marker on load
    setMarker(menu.childNodes[0].childNodes[0]);
    // display first city on load
    // todo: display based on closes locale
    showCityInfo(0);
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
    expects an positive integer
  */
  function showCityInfo(index) {
    // there should only be one shown city
    let activeCity = cityContainer.querySelector('.show');
    if (activeCity) activeCity.classList.remove('show');
    cityContainer.childNodes[index].classList.add('show');
  }

  /* 
    expects a string, returns a string formatted as h:mm AM/PM;
  */
  function zoneTime(timezone) {
    // todo: get local from client instead of defaulting to 'en-US'
    let str = new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      minute: "2-digit",
      hour: "numeric",
      hour12: true
    });
    return str;
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