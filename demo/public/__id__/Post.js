
// "skit" is globally available and has some useful things in it.
var Controller = skit.platform.Controller;
var navigation = skit.platform.navigation;
var net = skit.platform.net;
var netproxy = skit.platform.netproxy;

var BaseController = library.BaseController;
var template = __module__.html;

return Controller.create(BaseController, {
  // Load some shit to render from a remove server.
  __preload__: function(onLoaded) {
    // We can get arguments out of the URL like so.
    var id = this.params['__id__'];
    id = parseInt(id.split('-').slice(-1)[0], 10);

    net.send('posts/' + id, {
      proxy: netproxy.getProxyNamed('wordpress'),
      success: function(response) {
        this.post = response.body;
      },
      complete: function() {
        if (!this.post) {
          navigation.notFound();
        }
        onLoaded();
      },
      context: this
    });
  },

  __title__: function() {
    return this.post['title'];
  },

  __body__: function() {
    return template(this.post);
  }
});
