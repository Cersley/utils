/**
 * draggable directive
 */

// initial global data
const data = {
  isDrag: false,

  lastMousePositionX: 0,
  lastMousePositionY: 0,

  chat: {
    initialHeight: 0,
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    proposedNewPositionX: '',
    proposedNewPositionY: '',
    headerMouseOffsetX: 0,
    headerMouseOffsetY: 0,
    initialZIndex: 0,
  },
};

// dom elements
let chat = null;
let header = null;
// handlers
const setChatPosition = (x, y, options = {}) => {
  if (options.revert === true) {
    chat.style.top = '';
    chat.style.left = '';
    chat.style.bottom = `${y}px`;
    chat.style.right = `${x}px`;
  } else {
    chat.style.top = `${y}px`;
    chat.style.left = `${x}px`;
    chat.style.bottom = '';
    chat.style.right = '';
  }
};
const prevent = (e) => { e.preventDefault(); return false; };

const onMouseDown = (e) => {
  // left mouse button
  if (e.target === header && e.button === 0) {
    data.isDrag = true;
    // set initial data of chat coordinates
    const rect = chat.getBoundingClientRect();
    data.chat.top = rect.top;
    data.chat.left = rect.left;
    data.chat.width = rect.width;
    data.chat.height = rect.height;
    // save mouse offset from chat edges
    data.chat.headerMouseOffsetX = e.offsetX + 2; // 2 - border offset
    data.chat.headerMouseOffsetY = e.offsetY + 2;
    // save initial mouse position on the screen
    data.lastMousePositionX = e.clientX;
    data.lastMousePositionY = e.clientY;
    // change row styles
    chat.style.zIndex = 9000;
    header.style.cursor = 'move';
    document.body.style.cursor = 'move';
    // fix annoying select on drag:
    document.addEventListener('selectstart', prevent);
  }
};

const onPageMouseUp = (e) => {
  // left mouse button
  if (e.button === 0 && data.isDrag === true) {
    data.isDrag = false;
    // reset row styles
    chat.style.zIndex = data.chat.initialZIndex;
    header.style.cursor = 'grab';
    document.body.style.cursor = 'default';
    // update chat coordinates for next dragging
    const rect = chat.getBoundingClientRect();
    data.chat.top = rect.top;
    data.chat.left = rect.left;
    // fix annoying select on drag:
    document.removeEventListener('selectstart', prevent);

    /**
     * open chat in a right direction*
     *
     * right direction*:
     * - chat at the top - open from top
     * - chat at the bottom - open from bottom
     */
    const isChatHided = chat.classList.contains('hide');
    const margin = isChatHided ? 0 : 50;
    const isEdgePosition = data.chat.proposedNewPositionY >= document.body.clientHeight - data.chat.initialHeight - margin;
    if (isEdgePosition) {
      const newChatPositionX = document.body.clientWidth - data.chat.proposedNewPositionX - data.chat.width;
      const newChatPositionY = document.body.clientHeight - data.chat.proposedNewPositionY - data.chat.height;
      requestAnimationFrame(() => {
        setChatPosition(newChatPositionX, newChatPositionY, { revert: true });
      });
    }

    // save/update current position
    const pushChatData = {
      x: data.chat.proposedNewPositionX,
      y: data.chat.proposedNewPositionY,
    };
    localStorage.setItem('push-chat-data:coords', JSON.stringify(pushChatData));
  }
};

const onMouseMove = (e) => {
  if (data.isDrag === true) {
    // count correct mouse offset from chat edges
    const mouseOffsetX = e.clientX - data.lastMousePositionX;
    const mouseOffsetY = e.clientY - data.lastMousePositionY;
    // count new chat position
    data.chat.proposedNewPositionX = data.chat.left + mouseOffsetX;
    data.chat.proposedNewPositionY = data.chat.top + mouseOffsetY;
    // edge cases
    // left
    if (e.clientX - data.chat.headerMouseOffsetX <= 0) {
      data.chat.proposedNewPositionX = 0;
    }
    // top
    if (e.clientY - data.chat.headerMouseOffsetY <= 0) {
      data.chat.proposedNewPositionY = 0;
    }
    // right
    if (e.clientX - data.chat.headerMouseOffsetX + data.chat.width >= document.body.clientWidth) {
      data.chat.proposedNewPositionX = document.body.clientWidth - data.chat.width;
    }
    // bottom
    if (e.clientY - data.chat.headerMouseOffsetY + data.chat.height >= document.body.clientHeight) {
      data.chat.proposedNewPositionY = document.body.clientHeight - data.chat.height;
    }

    requestAnimationFrame(() => {
      setChatPosition(data.chat.proposedNewPositionX, data.chat.proposedNewPositionY);
    });
  }
};

export default {
  inserted(element) {
    chat = element;
    data.chat.initialZIndex = chat.style.zIndex;
    const rect = chat.getBoundingClientRect();
    data.chat.initialHeight = 400; // TODO: save here data from css (mb css variables?)
    header = chat.querySelector('.push-chat__header');

    header.addEventListener('mousedown', onMouseDown);

    document.addEventListener('mouseup', onPageMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    // restore chat position
    const pushChatData = JSON.parse(localStorage.getItem('push-chat-data:coords'));
    if (pushChatData !== null) {
      /**
       * open chat in a right direction*
       *
       * right direction*:
       * - chat at the top - open from top
       * - chat at the bottom - open from bottom
       */
      const isChatHided = chat.classList.contains('hide');
      const margin = isChatHided ? 0 : 50;
      const isEdgePosition = pushChatData.y >= document.body.clientHeight - data.chat.initialHeight - margin;
      if (isEdgePosition) {
        const newChatPositionX = document.body.clientWidth - pushChatData.x - rect.width;
        const newChatPositionY = document.body.clientHeight - pushChatData.y - rect.height;
        setChatPosition(newChatPositionX, newChatPositionY, { revert: true });
      } else {
        setChatPosition(pushChatData.x, pushChatData.y);
      }
    }
  },
  unbind() {
    chat = null;
    header.removeEventListener('mousedown', onMouseDown);
    header = null;

    document.removeEventListener('mouseup', onPageMouseUp);
    document.removeEventListener('mousemove', onMouseMove);

    localStorage.removeItem('push-chat-data:coords');
  },
};
