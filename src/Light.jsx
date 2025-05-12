export default function Light({ color, on = false }) {

    const css = {
        backgroundColor: on ? color : 'black',
    }
    return <div className="bulb" style={ css } />;
}