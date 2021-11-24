class MapScreen {
  
  constructor() {
    
    this.container = new PIXI.Container();
    
    this.bg = new Sprite(PIXI.Texture.WHITE);
    this.bg.width = width;
    this.bg.height = height;
    this.bg.tint = 0x00AA00;
    
    this.textBox = new PIXI.TextInput({
      input: {
        fontSize: '12pt',
        multiline: true,
        padding: '15px',
        width: '220px',
        height: (height - 130) + 'px',
        color: '#26272E',
        background: '#E8E9F3',
        overflow: 'scroll',
        spellcheck: false
      },
    });
    
    this.textBox.x = width - 300;
    this.textBox.y = 20;
    this.textBox.substituteText = false;
    
    this.textBox.text = template;
    
    this.path = new PIXI.Graphics();

    this.btn = new Button("Generate", width - 300, height - 70, 250, 50, this.click.bind(this));
    
    this.container.addChild(this.bg);
    this.container.addChild(this.path);
    this.container.addChild(this.textBox);
    this.container.addChild(this.btn);



    this.mapPositions = [];
    
  }
  
  
  update() {
    
    
    
  }
  
  click() {
    try {
      let obj = JSON.parse(this.textBox.text);
      this.createMap(obj);
      this.showPath();
    } catch(e) {
      alert(e);
    }
  }


  createMap(config) {

    let validPath = false
    let iterationCount = 0;

    while(!validPath) {

      this.mapPositions = [];

      this.mapPositions.push(config.start);

      let totalLength = 0;

      let lastVector = {
        x: 1,
        y: 0
      }

      let lastPos = config.start;

      validPath = true;
      iterationCount++;


      while (totalLength < config.length.min) {
        let angle = this.map(Math.random(), 0, 1, config.angles[0].min, config.angles[0].max);
        let length = this.map(Math.random(), 0, 1, config.segmentLength.min, config.segmentLength.max);
        totalLength += length;


        let rad = angle * (Math.PI / 180);

        let v = this.rotate(lastVector, rad);
        let newPos = {
          x: lastPos.x + v.x * length,
          y: lastPos.y + v.y * length
        }

        if (newPos.x < 0 || newPos.y < 0 || newPos.x > width || newPos.y > height) {
          validPath = false;
          break;
        }

        this.mapPositions.push(newPos);

        lastVector = v;
        lastPos = newPos;
      }

    }

    console.log(iterationCount);

  }

  showPath() {
    this.path.clear();
    this.path.lineStyle(5, 0x000000);
    this.path.moveTo(this.mapPositions[0].x, this.mapPositions[0].y);

    for (let i = 1; i < this.mapPositions.length; i++) {
      this.path.lineTo(this.mapPositions[i].x, this.mapPositions[i].y);
    }

  }


  map(val, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * (val - min1) / (max1 - min1);
  }

  rotate(vec, rad) {
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);

    let v2 = {
      x: Math.round(10000 * (vec.x * cos - vec.y * sin)) / 10000,
      y: Math.round(10000 * (vec.x * sin + vec.y * cos)) / 10000
    }
    return v2;
  }
  
  
  
}