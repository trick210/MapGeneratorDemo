class MapScreen {
  
  constructor() {
    
    this.container = new PIXI.Container();
    
    this.bg = new Sprite(PIXI.Texture.WHITE);
    this.bg.width = width - 300;
    this.bg.height = height;
    this.bg.tint = 0x00AA00;

    this.bgText = new Sprite(PIXI.Texture.WHITE);
    this.bgText.width = 300;
    this.bgText.height = height;
    this.bgText.x = width - 300;
    this.bgText.tint = 0x2C3559;
    
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
    
    this.textBox.x = width - 270;
    this.textBox.y = 20;
    this.textBox.substituteText = false;
    
    this.textBox.text = template;
    
    this.path = new PIXI.Graphics();
    this.pathSegments = new PIXI.Graphics();

    this.btn = new Button("Generate", width - 270, height - 70, 250, 50, this.click.bind(this));
    
    this.container.addChild(this.bg);
    this.container.addChild(this.path);
    this.container.addChild(this.pathSegments);
    this.container.addChild(this.bgText);
    this.container.addChild(this.textBox);
    this.container.addChild(this.btn);



    this.pathGenerator = new PathGenerator();
    
  }
  
  
  update() {
    
    
    
  }
  
  click() {
    //try {
      let obj = JSON.parse(this.textBox.text);
      obj.width = this.bg.width;
      obj.height = this.bg.height;
      let mapPositions = this.pathGenerator.createMap(obj);
      this.showPath(mapPositions);
    //} catch(e) {
    //  alert(e);
    //}
  }


  

  showPath(mapPositions) {

    let polygon = mapPositions.outlineBot.concat(mapPositions.outlineTop.reverse());


    this.path.clear();
    this.path.lineStyle(5, 0x000000);
    this.path.beginFill(0xC2B280);
    this.path.moveTo(polygon[polygon.length - 1].x, polygon[polygon.length - 1].y);


    for (let i = 0; i < polygon.length; i++) {
      this.path.lineTo(polygon[i].x, polygon[i].y);
    }

    this.path.endFill();

    this.pathSegments.clear();
    this.pathSegments.lineStyle(5, 0x0000FF, 0.2);
    this.pathSegments.moveTo(mapPositions.path[0].x, mapPositions.path[0].y);

    for (let i = 1; i < mapPositions.path.length; i++) {
      this.pathSegments.lineTo(mapPositions.path[i].x, mapPositions.path[i].y);
    }

  }
  
  
}