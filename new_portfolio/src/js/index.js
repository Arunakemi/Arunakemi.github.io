let {Application, Assets, Sprite} = PIXI
const IMAGE_PATH = './src/img/';
const app = new Application();
await app.init({resizeTo: window});
document.body.appendChild(app.canvas);
const texture = await Assets.load(IMAGE_PATH + 'bunny.png');
const bunny = new Sprite(texture);
let get_smallest_side = () => { return (app.renderer.width < app.renderer.height)? app.renderer.width : app.renderer.height; }
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;
let set_bunny_size = () => { window.setTimeout(()=>{bunny.setSize(get_smallest_side() / 2);}, 1); }
set_bunny_size();
app.stage.addChild(bunny);
window.onresize = set_bunny_size;
window.onmousemove = (e)=>{
    bunny.x = e.pageX || e.touches[0].pageX;
    bunny.y = e.pageY || e.touches[0].pageY;
}
app.ticker.add(() => {
    bunny.rotation += 0.01;
});