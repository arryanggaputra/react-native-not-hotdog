import RNFS from "react-native-fs";
import _ from "lodash";

const CLARIFAI_MODEL_ID = "Not Hotdog";
const CLARIFAI_ENDPOINT = `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`;
const CLARIFAI_API_KEY = "";

export async function ValidateTheHotdog(imageData) {
  var data = PrepareData(imageData);
  var headerConfig = new Headers();
  headerConfig.append("Content-Type", "application/json");
  headerConfig.append("Authorization", `Key ${CLARIFAI_API_KEY}`);

  return fetch(CLARIFAI_ENDPOINT, {
    method: "POST",
    headers: headerConfig,
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return CheckTheResult(data);
    });
}

export async function ConvertToBase64(path) {
  return RNFS.readFile(path, "base64")
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log("read error");
      console.log(err);
    });
}

export async function DeleteImage(path) {
  RNFS.unlink(path)
    .then(() => {
      console.log("FILE DELETED");
    })
    .catch(err => {
      console.log(err.message);
    });
}

export const CheckTheResult = data => {
  // get the output from clarifai response
  outputs = _.first(data.outputs);

  //   filtering the outputs
  result = _.filter(outputs.data.concepts, item => {
    //   just get the "hot dog" concept
    if (item.name == "hot dog") {
      // check if the hot dog value is greather than 0.5
      return item.value.toFixed() > 0.5;
    }
  });

  return result.length > 0 ? true : false;
};

export const PrepareData = imageData => {
  var data = {
    inputs: [
      {
        data: {
          image: {
            base64: imageData
          }
        }
      }
    ]
  };
  return data;
};
