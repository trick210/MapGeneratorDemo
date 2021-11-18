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
				background: '#E8E9F3'
			},
		});
		
		this.textBox.x = width - 300;
		this.textBox.y = 20;
		this.textBox.substituteText = false;
		
		this.textBox.text = template;
		
		
		this.btn = new Button("Generate", width - 300, height - 70, 250, 50, this.click.bind(this));
		
		this.container.addChild(this.bg);
		this.container.addChild(this.textBox);
		this.container.addChild(this.btn);
		
	}
	
	
	update() {
		
		
		
	}
	
	click() {
		let obj = JSON.parse(this.textBox.text);
		console.log(obj);
	}
	
	
	
}