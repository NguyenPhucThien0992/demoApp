// const API_URL = "http://192.168.219.106:3000";
// const GET_ALL_URL = `${API_URL}/fetchmachinesdata`;
// const GET_URL = `${API_URL}/fetchmachinesdata`;
// const UPDATE_URL = `${API_URL}/UpdateMachinesData`;

const API_URL = "http://192.168.0.101:3000";
const GET_ALL_URL = `${API_URL}/fetchmachinesdata`;
const GET_URL = `${API_URL}/fetchmachinesdata`;
const UPDATE_URL = `${API_URL}/UpdateMachinesData`;

function getAllMachines() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const machines = JSON.parse(xhr.responseText);
        const clientItems = machines.map(item => mapToClientDataItem(item));

        resolve(clientItems);
      } else if (xhr.readyState == 4) {
        reject(xhr.responseText);
      }
    };
    xhr.open("GET", GET_ALL_URL, true);
    xhr.send(null);
  });
}

function getMachine(id) {
  if (typeof id !== "number") {
    id = +id;
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const machine = JSON.parse(xhr.responseText);
        const clientItem = mapToClientDataItem(machine);

        resolve(clientItem);
      } else if (xhr.readyState == 4) {
        reject(xhr.responseText);
      }
    };
    xhr.open("GET", `${GET_URL}/${id}`, true);
    xhr.send(null);
  });
}

function updateMachineData(data) {
  return new Promise((resolve, reject) => {
    let { id } = data;
    if (typeof id !== "number") {
      id = +id;
    }

    var xhr = new XMLHttpRequest();
    var url = `${UPDATE_URL}/${id}`;
    var payload = mapToServerDataItem(data);

    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      } else if (xhr.readyState == 4) {
        reject(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(payload));
  });
}

function mapToClientDataItem(serverItem) {
  let { Id, JsonData } = serverItem;

  if (typeof Id !== "number") {
    Id = +Id;
  }

  if (JsonData) {
    JsonData = JSON.parse(JsonData);
  }

  if (JsonData && JsonData.id != null) {
    JsonData.id = Id;
  }

  return JsonData;
}

function mapToServerDataItem(clientItem) {
  let { id } = clientItem;
  if (id && typeof id !== "number") {
    id = +id;
  }

  return {
    id: id,
    jsonData: JSON.stringify(clientItem)
  };
}

export { getAllMachines, getMachine, updateMachineData };
