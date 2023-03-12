//I created an event handler to select the targeted row, extract data, put data into the edit form on the modal, and then show the modal
const handleEdit = (event) => {
  const row = event.currentTarget.closest("tr");
  const currentData = row.dataset;
  document.getElementById("artistInputEdit").value = currentData.artist;
  document.getElementById("songInputEdit").value = currentData.title;
  document.getElementById("idInputEdit").value = currentData.id;
  bootstrap.Modal.getOrCreateInstance("#editModal").show();
};

//I created an event handler to delete the targeted row
const handleDelete = (event) => {
  const row = event.currentTarget.closest("tr");
  fetch("http://fatguyconsulting.com/claire/api/" + row.dataset.id, {
    method: "delete",
    headers: {
      authorization: "KoolKatzDJ",
      "content-type": "application/json",
    },
  }).then((response) => {
    document.getElementById("songList").removeChild(row);
  });
};

//I created an event handler to gather data from the form, post it to the API, and create a row based on the response
document.getElementById("songSubmit").addEventListener("click", (event) => {
  event.preventDefault();
  const Artist = document.getElementById("artistInput").value;
  const Song = document.getElementById("songInput").value;
  fetch("http://fatguyconsulting.com/claire/api", {
    method: "post",
    headers: {
      authorization: "KoolKatzDJ",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      artist: Artist,
      title: Song,
    }),
  })
    .then((response) => response.json())
    .then((element) => {
      const artistElem = document.createElement("td");
      artistElem.innerText = element.artist;
      const songElem = document.createElement("td");
      songElem.innerText = element.title;
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.classList.add("btn", "btn-sm", "btn-outline-warning");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", handleEdit);
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("btn", "btn-sm", "btn-outline-danger");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", handleDelete);
      const actionElem = document.createElement("td");
      actionElem.appendChild(editButton);
      actionElem.appendChild(deleteButton);
      const rowElem = document.createElement("tr");
      rowElem.dataset.id = element.id;
      rowElem.dataset.artist = element.artist;
      rowElem.dataset.title = element.title;
      rowElem.appendChild(artistElem);
      rowElem.appendChild(songElem);
      rowElem.appendChild(actionElem);
      document.getElementById("songList").appendChild(rowElem);
      document.getElementById("artistInput").value = "";
      document.getElementById("songInput").value = "";
    });
});

//I created an event handler to gather data from the modal form, put it to the API, and swap the edited row based on the response
document.getElementById("editSave").addEventListener("click", (event) => {
  event.preventDefault();
  const Artist = document.getElementById("artistInputEdit").value;
  const Song = document.getElementById("songInputEdit").value;
  const Id = document.getElementById("idInputEdit").value;
  fetch("http://fatguyconsulting.com/claire/api/" + Id, {
    method: "put",
    headers: {
      authorization: "KoolKatzDJ",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      artist: Artist,
      title: Song,
    }),
  })
    .then((response) => response.json())
    .then((element) => {
      const artistElem = document.createElement("td");
      artistElem.innerText = element.artist;
      const songElem = document.createElement("td");
      songElem.innerText = element.title;
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.classList.add("btn", "btn-sm", "btn-outline-warning");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", handleEdit);
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("btn", "btn-sm", "btn-outline-danger");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", handleDelete);
      const actionElem = document.createElement("td");
      actionElem.appendChild(editButton);
      actionElem.appendChild(deleteButton);
      const rowElem = document.createElement("tr");
      rowElem.dataset.id = element.id;
      rowElem.dataset.artist = element.artist;
      rowElem.dataset.title = element.title;
      rowElem.appendChild(artistElem);
      rowElem.appendChild(songElem);
      rowElem.appendChild(actionElem);
      for (const row of document.getElementById("songList").children) {
        if (row.dataset.id === rowElem.dataset.id) {
          row.replaceWith(rowElem);
        }
      }
      document.getElementById("artistInputEdit").value = "";
      document.getElementById("songInputEdit").value = "";
      document.getElementById("idInputEdit").value = "";
      bootstrap.Modal.getOrCreateInstance("#editModal").hide();
    });
});

//I created an event handler to retrieve the entire list from the API
window.addEventListener("load", () => {
  fetch("http://fatguyconsulting.com/claire/api", {
    method: "get",
    headers: {
      authorization: "KoolKatzDJ",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        const artistElem = document.createElement("td");
        artistElem.innerText = element.artist;
        const songElem = document.createElement("td");
        songElem.innerText = element.title;
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("btn", "btn-sm", "btn-outline-warning");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", handleEdit);
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("btn", "btn-sm", "btn-outline-danger");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", handleDelete);
        const actionElem = document.createElement("td");
        actionElem.appendChild(editButton);
        actionElem.appendChild(deleteButton);
        const rowElem = document.createElement("tr");
        rowElem.dataset.id = element.id;
        rowElem.dataset.artist = element.artist;
        rowElem.dataset.title = element.title;
        rowElem.appendChild(artistElem);
        rowElem.appendChild(songElem);
        rowElem.appendChild(actionElem);
        document.getElementById("songList").appendChild(rowElem);
      });
    });
});
