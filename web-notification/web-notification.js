class WebNotification {
  constructor() {
    this.permission = false;
    this.defaultTitle = document.title;
    this.changeTitleInterval = 0;
    this.hasNewMessage = false;

    this.onWindowFocus = this.onWindowFocus.bind(this);
    this.show = this.show.bind(this);
  }

  init() {
    Notification.requestPermission((result) => {
      if (result === 'granted') {
        this.permission = true;
      }
    });

    window.addEventListener('focus', this.onWindowFocus);

    // don't show notification if tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden === true) {
        // on hidden
      } else {
        // on visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, false);
  }

  show({ email, message }) {
    if (this.permission === true) {
      const icon = '';
      const options = {
        tag: message.id,
        body: message.text,
        badge: icon,
        icon,
      };

      const notification = new Notification(email, options);
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      this.changePageTitle();
    }
  }

  changePageTitle() {
    if (this.hasNewMessage === false) {
      this.hasNewMessage = true;

      document.title = 'New message';
      this.changeTitleInterval = setInterval(() => {
        if (document.title === this.defaultTitle) {
          document.title = 'New message';

          return;
        }

        document.title = this.defaultTitle;
      }, 700);
    }
  }

  onWindowFocus() {
    if (this.hasNewMessage === true) {
      this.hasNewMessage = false;
      clearInterval(this.changeTitleInterval);
      this.changeTitleInterval = 0;
      document.title = this.defaultTitle;
    }
  }
}

const webNotification = new WebNotification();

export default webNotification;
