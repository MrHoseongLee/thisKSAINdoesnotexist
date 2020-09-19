async function generate() {

    const MODEL_URL = "https://raw.githubusercontent.com/MrHoseongLee/thisKSAINdoesnotexist/master/tfjs_model/model.json";
    const model = await tf.loadGraphModel(MODEL_URL);
    const input = tf.randomNormal([1, 256, 1, 1]);
    const output = await model.execute(input).array();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(96, 128);
    for (let i = 0; i < imageData.data.length / 4; i += 1) {
        imageData.data[4 * i + 0] = (output[0][0][Math.floor(i / 96)][i % 96] + 1) / 2 * 255;
        imageData.data[4 * i + 1] = (output[0][1][Math.floor(i / 96)][i % 96] + 1) / 2 * 255;
        imageData.data[4 * i + 2] = (output[0][2][Math.floor(i / 96)][i % 96] + 1) / 2 * 255;
        imageData.data[4 * i + 3] = 255;
    }
    const scale = Math.min(Math.floor(window.innerWidth / 96), Math.floor(window.innerHeight / 128))
    canvas.style.scale = scale
    canvas.style.left = (Math.floor(window.innerWidth / 2) - 48) + "px"
    canvas.style.top = (Math.floor(window.innerHeight / 2) - 64) + "px"
    ctx.putImageData(imageData, 0, 0);

}

generate()
