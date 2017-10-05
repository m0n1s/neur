const Random = require("./rng");
const MathFun = require("./math.js");

const math = new MathFun();

const defaultConfig = {
    layer: [
        // Layer 1
        [4,3], // 4 x neuron with 3 x Input
        // Layer 2
        [1,4], // 1 x neuron with 4 x Input
    ]
}

var rng = new Random();
rng.seed(1);


const defaultConfigNeuron = {
    
}
class Layer{

    constructor(config){
        this.config = defaultConfigNeuron;
        Object.assign(this.config, config);
        this.input = new Array(config.inputSize);
        this.weights = Array.from({length: config.inputSize * config.neuronCount}, () => (2 * rng.random()) - 1);
    }
    think(inputs){
       
        var tod = math.dot(inputs, this.weights);
        return math.sigmoid(tod);
    }
    train(dataset, iterationCount, steps){
        var dIn = dataset.map((e)=>e.in);
        var dOut = dataset.map((e)=>e.out);

        for(var iteration = 0; iteration < iterationCount; iteration++){
            for (var i = 0; i < dIn.length ; i++) {
                var tmpIn = dIn[i];
                var tmpOut = dOut[i][0];
                var output = this.think(tmpIn);

                var error = (tmpOut - output) ;

                for (var w = 0; w < tmpIn.length; w++) {
                    this.weights[w] += (steps*tmpIn[w] * error * math.sigmoidDerivative(output));
                }
            }
        }
    }
}

class Atom {
    constructor(){
        this.layer = [];
    }
    build(config){
        this.config = defaultConfig;
        Object.assign(this.config, config);
        this.layer = new Array(this.config.layer.length);
        for (var i = 0; i < this.config.layer.length; i++) {
            this.layer[i] = new Array(this.config.layer[i][0]);
            for (var n = 0; n < this.config.layer[i][0]; n++) {
                this.layer[i][n] = new Neuron({inputSize: this.config.layer[i][1]});
            }
        }
    }

    train(){

    }

    think(){

    }
}

module.exports = Atom;