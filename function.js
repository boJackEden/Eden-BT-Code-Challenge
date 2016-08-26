$(document).ready(function() {

  var bundles = ['the-crash-reel', 'bill-nye', 'a-silent-film', 'd6953c75e63d30e9cb7f61891154226dc3362b3a277c3478aa46eef6c7d7c0e4'];

  bundles.forEach(function (element, index) {
    $.get('https://now.bt.co/api/v1/bundles/' + element, function(data) {

      var hash = 'https://now.bt.co/bundles/' + data.hash;
      var title = data.title;
      var author = data.author;
      var plays = data.stats.play.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var backImg = 'http://img4.bundle.media/bittorrent/image/upload/f_jpg,w_1440,q_70/content-bundles/' + data.background;
      var thumbImg = 'http://img4.bundle.media/bittorrent/image/upload/f_jpg,w_1440,q_70/content-bundles/' + data.cover;
      var tags = data.tags;

      if (title.length > 13) title = trimText(title);
      if (author.length > 13) author = trimText(author);
      tags = createTagHtml(tags);

      var html = [
        '<div class="wrapper">',
          '<div class="tile" style="background-image: url(\'' + backImg + '\')"></div>',
          '<div class="content">',
            '<div data="' + hash + '" class="thumb" style="background-image: url(\'' + thumbImg + '\')"></div>',
            '<div data="' + hash + '" class="title">' + title + '</div>',
            '<div data="' + hash + '" class="author">' + author + ' &#9679</div>',
            '<div class="plays"> ' + plays + ' PLAYS</div>',
             tags,
          '</div>',
        '</div>'
      ].join('');

      $(html).appendTo('.tiles');
      $('.wrapper').fadeIn('slow');
      appendHandlers();
    });
  });

  ///////////////////////////
  //////events handlers//////
  ///////////////////////////
  function appendHandlers () {
    $('.title, .author, .thumb').on('click', function(e) {
      e.preventDefault();
      window.location = $(this).attr('data');
    });

    $('.tag').on('click', function (e) {
      window.location = 'https://now.bt.co/search/tags:"'+ $(this).text() +'"';
    });
  }
  //////////////////////////
  /////helper functions/////
  //////////////////////////

  function trimText(text) {
    return text.substring(0, 15) + '...';
  }

  function createTagHtml (tags) {
    if (tags.length > 6) {
      tags = tags.slice(0, 6);
    }
    var tagHtml = '';
    for (var i=0; i<tags.length; i++) {
      tagHtml = tagHtml + '<div class="tag">' + tags[i] + '</div>';
    }
    return '<div class="tag-container">' + tagHtml + '</div>';
  }

});
