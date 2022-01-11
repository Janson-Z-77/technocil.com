(function($, Drupal, drupalSettings) {
    $(document).ready(function() {

        $('.filters-toggle').on('click', function() {
            $('.filters').toggleClass('show');
        });

        var qsParams = getQSParams();
        newsSelectedFilters.init(parseInt(qsParams.y), parseInt(qsParams.m));
    });

    function getQSParams() {

        var url = window.location.href;
        var queryString = url.split('?')[1];
        var obj = {};

        if (queryString) {
            queryString = queryString.split('#')[0];
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');

                var paramName = a[0];
                var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];

                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                if (paramName.match(/\[(\d+)?\]$/)) {
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    if (paramName.match(/\[\d+\]$/)) {
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        obj[key].push(paramValue);
                    }
                } else {
                    if (!obj[paramName]) {
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    }

    function setQSParam(obj) {
        var url = window.location.href;
        var base = url.split('?')[0] + "?";
        var qp = [];
        for (var key in obj) {
            qp.push(key + "=" + encodeURIComponent(obj[key]));
        }
        return base + qp.join("&");
    }

    var newsSelectedFilters = {

        selectedYear: null,
        selectedMonth: null,
        selectedTypes: [],

        open: function() {
            $('.select-box .open-link').click(function(e) {
                var $me = $(this).closest('.select-box');
                $('.filters .select-box').not($me).addClass('closed');
                $me.toggleClass('closed');
                e.stopPropagation();
            });
            $(window).click(function() {
                $('.select-box').addClass('closed');
            });
        },

        overItem: function() {
            $('.select-box .select li').mouseover(function() {
                var t = $(this).position().top;
                $(this).parents('.ul').find('.over').css('transform', 'translate3d(0,' + (t - 2) + 'px,0)');
            })
        },

        clickFilter: function() {
            var _this = this;

            $('.filters .select-box .select li a').click(function() {
                // $('.filters .select-box .select li a').addClass('active');
                // $(this).addClass('active');
                // _this.selectedMonth = $(this).attr('data-month');
                // _this.filterNews();
                // $('.select-box').addClass('closed');
                // $('.select-box .open-link .label').html($(this).html());


                _this.setCurrentItem.call(_this, $(this));
                $('.select-box').addClass('closed');
                _this.filter();

            });


            // $(".filters .filter").on('click',function(){
            //   if($(this).hasClass('active')){
            //     $(this).removeClass('active');
            //   } else {
            //     $(this).addClass('active');
            //   }
            //   _this.selectedTypes = [];
            //   $(".filters .filter.active").each(function(){
            //     _this.selectedTypes.push($(this).attr('data-type'));
            //   });
            //   _this.filterNews();
            // })
        },

        setCurrentItem: function(item) {
            if (item.length) {
                var $selectBox = item.closest('.select-box');
                var dataType = $selectBox.attr('data-type');
                $('.select li a', $selectBox).removeClass('active');
                item.addClass('active');
                switch (dataType) {
                    case 'year':
                        this.selectedYear = item.attr('data-year');
                        break;
                    case 'month':
                        this.selectedMonth = item.attr('data-month');
                        break;
                }
                $('.open-link .label', $selectBox).html(item.html());
            }
        },

        filter: function() {

            var qp = getQSParams();

            if (this.selectedYear) {
                qp.y = this.selectedYear;
            } else {
                delete qp.y;
            }
            if (this.selectedMonth) {
                qp.m = this.selectedMonth < 10 ? "0" + this.selectedMonth : this.selectedMonth;
            } else {
                delete qp.m;
            }
            location.href = setQSParam(qp);

        },
        // filterNews: function(){
        //   var _this = this;
        //   $('.news-item').each(function(){
        //     if(!_this.selectedYear && !_this.selectedMonth && !_this.selectedTypes.length){
        //       $(this).fadeIn();
        //     }else{
        //       //controllo tutti i parametri
        //       var ok = true;
        //       if(_this.selectedYear && $(this).attr('data-year') != _this.selectedYear){
        //         ok = false;
        //       }
        //       if(_this.selectedMonth && $(this).attr('data-month') != _this.selectedMonth){
        //         ok = false;
        //       }
        //       if(_this.selectedTypes.length && _this.selectedTypes.indexOf($(this).attr('data-type'))<0 ){
        //         ok = false;
        //       }
        //       if(ok){
        //         $(this).fadeIn();
        //       }else{
        //         $(this).fadeOut();
        //       }
        //     }
        //   });
        // },

        init: function(year, month) {
            var activeYear = $('.select-box[data-type=year] .select li a[data-year=' + year + ']');
            var activeMonth = $('.select-box[data-type=month] .select li a[data-month=' + month + ']');
            this.setCurrentItem(activeYear);
            this.setCurrentItem(activeMonth);
            this.open();
            this.overItem();
            this.clickFilter();
        }
    };


})(jQuery, window.Drupal, window.drupalSettings);