## titlebar for weewx skins
## Copyright Tom Keffer, Matthew Wall
## See LICENSE.txt for your rights
#errorCatcher Echo

<div id="title_bar">
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
