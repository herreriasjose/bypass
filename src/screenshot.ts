import html2canvas from 'html2canvas';

export default async function downloadScreenShot() {
    const downloadElement = `<div id="download"> <img id="canvas"> <a id="dl-link"></a> </div>`;
    const elementA = document.createElement('div');
    elementA.innerHTML = downloadElement;
    document.body.appendChild(elementA);
 
    const tableElement = document.body;
    const canvasElement = (<HTMLInputElement>document.querySelector('#canvas'));
    const linkElement = (<HTMLAnchorElement>document.querySelector('#dl-link'));

    html2canvas(tableElement).then(canvas => {
        if (canvasElement != null) {
            canvasElement.src = canvas.toDataURL();
        }
        if (linkElement != null) {
            linkElement.href = canvas.toDataURL('image/png');
            linkElement.download = 'table.png';
            linkElement.click();
        }
    });
}