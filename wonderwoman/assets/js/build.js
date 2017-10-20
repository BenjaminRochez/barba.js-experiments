jQuery(document).ready(function($) {



/*$('.nav__item').click(function(e){
    $this = $(this);
   if($this.hasClass('is-open')){
    $this.removeClass('is-open');
    var zindex = $this.attr('data-zindex');

    setTimeout(function(){ $this.css({'z-index': zindex}); }, 305);
   }else{
       $this.css({'z-index': 99});
       $this.addClass('is-open');
    }
});
*/



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
    console.log(elClicked);
    var tl = new TimelineMax();
    tl.to(elClicked, 1,{className: '+=is-open', onComplete: function() {
      deferred.resolve();
    }});

    return deferred.promise;
  },

  showNewPage: function() {
    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  var transitionObj = ExpandTransition;

  //Barba.HistoryManager.prevStatus().namespace
  return transitionObj;
};

Barba.Pjax.start();

});
