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

var tg = function(yo){

};

Barba.Dispatcher.on('linkClicked', function(MouseEvent) {
  //your listener
    console.log(MouseEvent);
    tg(MouseEvent);
});



Barba.Pjax.start();
    var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    //return $(this.oldContainer).animate({ opacity: 0 }, 400).promise();
      console.log('fadeout');

  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */
    console.log('fadein');
    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};
});


