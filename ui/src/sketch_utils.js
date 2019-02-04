/*
Copyright 2017 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  Demonstration of parsing simplified ndjson files from  Quick, Draw! dataset with node.js.
  Read in all of the simplified drawings into memory and log out some properties.
  https://github.com/googlecreativelab/quickdraw-dataset
  https://quickdraw.withgoogle.com/data
  This demo assumes you've put the file "face-simple.ndjson" into a folder called "data"
  in the same directory as this script.
*/
// var fs = require('fs');
// var ndjson = require('ndjson'); // npm install ndjson

import * as fs from "fs";
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import ndjsonStream from 'can-ndjson-stream';

export function parseSimplifiedDrawings(url, callback) {

  fetch(url).
    then( function(response) {
      return response.body;
    }).
    then( function(body) {
      // console.log("body", body);
      const stream = ndjsonStream(body);
      // body.getReader();
      var drawings = [];

      const reader = stream.getReader();
      let read;
        // console.log("start of stream");
      reader.read().then(read = (result) => {
        if (result.done) {
          console.log("Read all jsons");
          console.log(drawings.length);
          return;
        }

        drawings.push(result.value);
        // console.log(result.value);
        reader.read().then(read);
      });
    });
}

