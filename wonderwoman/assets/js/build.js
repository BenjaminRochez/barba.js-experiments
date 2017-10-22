jQuery(document).ready(function($) {


  var elClicked = '';


Barba.Dispatcher.on('linkClicked', function(el){
  elClicked = el;
});


var ExpandTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.zoom()])
      .then(this.showNewPage.bind(this));
  },

  zoom: function() {
    var deferred = Barba.Utils.deferred();
    var elAttr = elClicked.getAttribute('data-zindex');
    var tl = new TimelineMax();
    tl.to(elClicked, 0, {css: {zIndex: elAttr}})
    .to(elClicked, 1,{className: '+=is-open', onComplete: function() {
      deferred.resolve();
    }});

    return deferred.promise;
  },

  showNewPage: function() {
    this.done();
  }
});



var BackTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.zoom()])
      .then(this.showNewPage.bind(this));
  },

  zoom: function() {
    var deferred = Barba.Utils.deferred();

    var tl = new TimelineMax();
    tl.to('body', 1,{opacity: 0, onComplete: function() {
      deferred.resolve();
    }})
    .to('body', 1, {opacity: 1});


    return deferred.promise;
  },

  showNewPage: function() {
    this.done();
  }
});

Barba.Pjax.getTransition = function() {

  var transitionObj = ExpandTransition;
  if(Barba.HistoryManager.prevStatus().namespace === "Single") {
     transitionObj = BackTransition;
  }
  return transitionObj;
};

Barba.Pjax.start();

});
