window.addEventListener('load', () => {
  getData();
});

function getData() {
  fetch('data.json')
    .then((res) => res.json())
    .then((datas) => {
      const option = document.getElementById('selectItem');
      let optionValue = null;
      const board = document.querySelector('.board');

      option.addEventListener('change', () => {
        optionValue = option.value;

        if (optionValue === 'MeetingRoom') {
          board.innerHTML = '';
          meetingRoom(datas);
        } else if (optionValue === 'Electronic') {
          board.innerHTML = '';
          electronicItem(datas);
        } else if (optionValue === 'Furniture') {
          board.innerHTML = '';
          furnitureItem(datas);
        } else if (optionValue === 'Purchased') {
          board.innerHTML = '';
          furnitureItem(datas);
        } else if (optionValue === 'Color') {
          board.innerHTML = '';
          colorBrown(datas);
        } else {
          board.innerHTML = '';
          showCard(datas);
        }
      });

      showCard(datas);
    });
}

function showCard(datas) {
  const board = document.querySelector('.board');
  datas.map((data) => {
    const nameItem = data.name;
    const placement = data.placement.name;
    const typeItem = data.type;
    const tags = data.tags;
    const dateNumber = data.purchased_at * 1000;
    const date = new Date(dateNumber);
    const textDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    board.append(createCard(nameItem, placement, typeItem, textDate, tags));
  });
}

function createCard(nameItem, placementName, typeItemName, date, tags) {
  const card = document.createElement('div');
  card.classList.add('card');

  const h3 = document.createElement('h3');
  h3.innerHTML = nameItem;

  const sectionMid = document.createElement('div');
  sectionMid.classList.add('section-mid');

  const placement = document.createElement('span');
  placement.classList.add('placement');
  placement.innerHTML = placementName;
  sectionMid.append(placement);

  const typeItem = document.createElement('span');
  typeItem.classList.add('typeItem');
  typeItem.innerHTML = typeItemName;
  sectionMid.append(typeItem);

  const h4 = document.createElement('h4');
  h4.innerHTML = date;

  let allParagraf = [];
  const paragraf = document.createElement('p');
  tags.map((tag) => {
    allParagraf.push(`#${tag}`);
  });
  paragraf.innerHTML = allParagraf.join(' ');

  card.append(h3);
  card.append(sectionMid);
  card.append(h4);
  card.append(paragraf);

  return card;
}

function meetingRoom(datas) {
  let rows = [];

  datas.forEach((data) => {
    const placement = data.placement.name;
    if (placement === 'Meeting Room') {
      rows.push(data);
    }
  });

  showCard(rows);
}

function electronicItem(datas) {
  let rows = [];

  datas.forEach((data) => {
    const typeItem = data.type;
    if (typeItem === 'electronic') {
      rows.push(data);
    }
  });

  showCard(rows);
}

function furnitureItem(datas) {
  let rows = [];

  datas.forEach((data) => {
    const typeItem = data.type;
    if (typeItem === 'furniture') {
      rows.push(data);
    }
  });

  showCard(rows);
}

function purchasedItem(datas) {
  let rows = [];

  datas.forEach((data) => {
    const dateNumber = data.purchased_at * 1000;
    const date = new Date(dateNumber);
    const textDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    if (textDate === 'January 16, 2020') {
      rows.push(data);
    }
  });
  showCard(rows);
}

function colorBrown(datas) {
  let rows = [];

  datas.forEach((data) => {
    const tags = data.tags;
    if (tags.indexOf('brown') !== -1) {
      rows.push(data);
    }
  });
  showCard(rows);
}
