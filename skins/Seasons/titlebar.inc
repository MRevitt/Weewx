## titlebar for weewx skins
## Copyright Tom Keffer, Matthew Wall
## See LICENSE.txt for your rights
##
## Mike Revitt  Add     <h2 class="page_sub_title">Current Weather Conditions</h2>
##              Change  <h3>$current.dateTime</h3>
##
#errorCatcher Echo
<section id="header">
  <div id="top-image">
    <div id="title">
      <h1>$station.location</h1>
      <h3>Weather Conditions on $current.dateTime</h3>
    </div>
    <div id="rss_link"><a href="rss.xml">RSS</a></div>
    <div id="reports">
      Monthly Reports:
      <select name="reports" onchange="openTabularFile(value)">
        #for $monthYear in $SummaryByMonth
        <option value="$monthYear">$monthYear</option>
        #end for
        <option selected>- Select Month -</option>
      </select>
      <br/>
      Yearly Reports:
      <select name="reports" onchange="openTabularFile(value)">
        #for $yr in $SummaryByYear
        <option value="$yr">$yr</option>
        #end for
        <option selected>- Select Year -</option>
      </select>
      <br/>
    </div>
  </div>
</section><!-- header -->
#include menu-bar.inc
