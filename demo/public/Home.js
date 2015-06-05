
// "skit" is globally available and has some useful things in it.
var dom = skit.browser.dom;
var events = skit.browser.events;
var Controller = skit.platform.Controller;
var net = skit.platform.net;
var netproxy = skit.platform.netproxy;
var iter = skit.platform.iter;
var object = skit.platform.object;

// This is another module in our library.
var BaseController = library.BaseController;

// Files with the same beginning ("Home" in this case)
// are grouped together into "modules".
// This is how you reference other files in this module.
var template = __module__.html;

var LISTS = [
  {name: 'Posts', key: 'posts'},
  {name: 'Pages',  key: 'pages'}
];


return Controller.create(BaseController, {
  // Load some shit to render from a remove server.
  __preload__: function(onLoaded) {
    if (!this.currentList) {
      this.currentList = LISTS[0].key;
    }

    this.posts = [];
    net.send(this.currentList, {
      proxy: netproxy.getProxyNamed('wordpress'),
      success: function(response) {
        this.posts = response.body;
      },
      complete: function() {
        onLoaded();
      },
      context: this
    })
  },

  // This dictates the page title on the server, but would also be used
  // in client-side navigation logic. Same with __body__ below.
  __title__: function() {
    return 'Home: ' + this.posts.length + ' posts';
  },

  __body__: function() {
    var listName;
    var lists = iter.map(LISTS, function(list) {
      list = object.copy(list);
      if (this.currentList == list.key) {
        listName = list.name;
        list.selected = true;
      }
      return list;
    }, this);
    return template({
      posts: this.posts,
      listName: listName,
      lists: lists
    });
  },

  // This method, in contrast, is only called on the client. Kinda weird, right?
  __ready__: function() {
    this.listener_ = events.delegate(document.body, '.list-item', 'click', this.onClickListLink_, this);
  },
  __unload__: function() {
    events.unbind(this.listener_);
  },

  onClickListLink_: function(evt) {
    evt.preventDefault();

    var $link = evt.currentTarget;
    if ($link.getData('loading')) {
      return;
    }
    $link.setData('loading', '1');
    
    $link.setText('Loading...');

    this.currentList = $link.getData('list');
    this.reload();
  }
});
