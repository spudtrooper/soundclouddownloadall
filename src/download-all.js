(async function () {

  const isDownloaded = (id) => {
    const state = JSON.parse(localStorage.getItem('state') || '{}');
    const { downloads } = state;
    if (!downloads) return false;
    return downloads.includes(id);
  };

  const setDownloaded = (id) => {
    let state = JSON.parse(localStorage.getItem('state') || '{}');
    let { downloads } = state;
    if (!downloads) downloads = [];
    downloads.push(id);
    state = { ...state, downloads };
    localStorage.setItem('state', JSON.stringify(state));
  };

  const checkAndSetDownloaded = (id) => {
    if (isDownloaded(id)) return true;
    setDownloaded(id);
    return false;
  };

  // ChatGPT
  function hoverElement(element) {
    var eventMouseOver = new MouseEvent('mouseover', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var eventMouseEnter = new MouseEvent('mouseenter', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    element.dispatchEvent(eventMouseOver);
    element.dispatchEvent(eventMouseEnter);
  }

  const downloadAll = async () => {
    await checkAll();
    return new Promise((resolve, reject) => {
      const dotss = Array.from(document.querySelectorAll('.sc-button-more'));
      if (!dotss) return;
      const loop = () => {
        console.log('loop', dotss.length);
        if (!dotss.length) {
          resolve();
          return;
        }

        const dots = dotss.pop(0);
        dots.click();
        const btn = document.querySelector('.sc-button-download');
        const id = btn.getAttribute('download');
        console.log(`have ${id}`);
        if (!isDownloaded(id)) {
          console.log(`downloading ${id}`);
          btn.click();
          setTimeout(() => {
            const master = document.querySelector('input[value=master]');
            if (!master) {
              console.log('no master');
              setDownloaded(id);
              setTimeout(loop, 1000);
              return;
            }

            master.click();
            setTimeout(() => {
              const download = document.querySelector('.downloadModal__downloadBtn');
              if (!download) {
                console.log('no download');
                setDownloaded(id);
                setTimeout(loop, 1000);
                return;
              }

              download.click();
              setDownloaded(id);
              setTimeout(loop, 1000);
            }, 100);
          }, 100);
        } else {
          console.log(`skipping ${id}`);
          setTimeout(loop, 10);
        }
      };
      loop();
    });
  };

  const checkAll = async () => {
    return new Promise((resolve, reject) => {
      const lis = Array.from(document.querySelectorAll('.trackManagerTrackList__item'));
      const loop = () => {
        console.log('loop', lis.length);
        if (!lis.length) {
          resolve();
          return;
        };

        const li = lis.pop(0);
        hoverElement(li.firstChild);
        setTimeout(loop, 10);
      };
      loop();
    });
  };

  const clickNext = async () => {
    const nxt = document.querySelector('.trackManagerPagination__nextButton');
    if (!nxt) {
      console.log('you are done');
      return;
    }

    nxt.click();
    setTimeout(main, 2000);
  };

  const main = async () => {
    await downloadAll();
    await clickNext();
  };

  await main();
})();