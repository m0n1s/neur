function MathFunctions(){
    this.sigmoid = (t) => {
        return 1/(1+Math.pow(Math.E, -t));
    }

    this.sigmoidDerivative = (x) => {
        return x * (1 - x);
    }

    this.dot = (a, b) => {
    	var n = a.length;
    	var sum = 0;

    	for (var i = 0; i < n; i++) {
    		sum += a[i] * b[i];
    	}
    	return sum;
    }

    this.arrAdd = (a,b) => {
        var sum = new Array(a.length);
        for(var i = 0; i < a.length; i++){
            sum[i] = a[i] + b[i];
        }
        return sum;
    }
}

module.exports = MathFunctions;
