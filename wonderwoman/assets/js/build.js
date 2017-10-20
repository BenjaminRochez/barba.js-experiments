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


var ExpandTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.zoom()])
      .then(this.showNewPage.bind(this));
  },

  zoom: function() {
    var deferred = Barba.Utils.deferred();
    var tl = new TimelineMax();
    tl.to('body', 1,{y: 100, onComplete: function() {
      console.log("pute");
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
