
# Timeline
Timeline is an easy way to showcase events. [See it here](http://old.joeylea.com/timeline/).  Timeline's features include autoplay, early preview, and custom timers. It uses no external JavaScript dependencies and works on IE11 and all other major browsers.


### Getting Started
Getting started is easy. Timeline requires that you include a script and stylesheet, and that you use specific ids and classes in your markup.  Follow the instructions below to get started.

#### First, include the Timeline stylesheet and script into your HTML
    <html>
     <head>
      <link href="/styles/timeline.min.css" rel="stylesheet">
     </head>
     <body>
      <!-- Add your Timeline markup here -->
      <script src="/js/timeline.min.js"></script>
     </body>
    </html>

#### Next, use the Timeline markup to create your line, ball and events
    <div id="tL-body" class="dark-theme round-theme">
      <div id="tL">
        <div class="tL line"></div>
        <div class="tL ball"></div> <!-- add id=tL-autoplay to this element (optional) -->

        <!-- Add your events -->
        <div class="tL event" data-side="right" data-timer="8000">
          <h4 class="tL title">My first event</h4>
          <time class="tL date">Today</time>
          <div class="tL body">
           <h3>This is timeline!</h3>
          </div>
        </div>
        <div class="tL event" data-side="left">
          <h4 class="tL title">Second  event</h4>
          <time class="tL date">March 11, 2016</time>
          <div class="tL body">
            <p>You should check out the autoplay in the docs, wow...</p>
          </div>
        </div>

      </div>
    </div>

## Features

### Autoplay
Autoplay automatically cycles through each event on your timeline.  By default, it spends 12 seconds on each event, but you can modify this by using a custom timer (see below). Any mouse click will disable autoplay, but if restarted, it begins where it left off.

Enable autoplay by adding an element with the id of `tL-autoplay` to your page.  How you choose to style this element is up to you, but the id `tL-autoPlay` must be used to trigger the feature. Here is a simple Bootstrap example that works nicely with the built in Timeline stylesheet.

    <div class="tL ball" id="tL-autoPlay">
      <div id="tL-autoPlay-icon"><span class="glyphicon glyphicon-chevron-right"></span></div>
    </div>

#### Custom Timer
You can change the amount of time that Autoplay will pause on a particular event by adding the `data-timer` attribute to any .tL.event element.  Choose your speed in milliseconds, but do not include the unit type: i.e. data-timer=5000. By default Autoplay pauses for 12000ms.

    <div class="tL event" data-timer="20000" data-side="right">
      ...
    </div>


### Early Preview
Early preview makes an event on the Timeline visible before it's clicked.  Add the `early-open` class to any .tL.event element to enable Early Preview. To hide specific body content from showing up, use a `not-early` class on the element. 

    <div class="tL event early-open" data-side="right">
      ...
      <div class="tL body">
        <p>This content will display on the timeline.</p>
        <p class="not-early">
        This content will not show up with the early preview and will only display when the event is clicked.
        </p>
      </div>
    </div>


