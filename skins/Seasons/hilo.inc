## hilo module for weewx skins
## Copyright Tom Keffer, Matthew Wall
## See LICENSE.txt for your rights
##
## Mike Revitt - Change the order of the fields displayed

#set $archive_data = [('day', $day), ('seven_day', $seven_day), ('month', $month), ('year', $year), ('alltime', $alltime)]

<div id='hilo_widget' class="widget">
  <div class="widget_title">
    <a href="statistics.html">High/Low</a>
    <a class="widget_control"
      onclick="toggle_widget('hilo')">&diams;</a>
  </div>

  <div class="widget_contents">
  <table>
    <tbody>
      <tr>
        <td></td>
        <th>&nbsp;<br/>Today</th>
        <th class="hilo_seven_day">&nbsp;<br/>Week</th>
        <th class="hilo_month">&nbsp;<br/>Month</th>
        <th class="hilo_year">&nbsp;<br/>Year</th>
        <th class="hilo_alltime">&nbsp;<br/>All Time</th>
        <td></td>
      </tr>
      <tr>
        <td class="label">$obs.label.outTemp</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].outTemp.maxtime">
            $archive[1].outTemp.max.format(add_label=False)</span><br/>
          <span title="$archive[1].outTemp.mintime">
            $archive[1].outTemp.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.outTemp</td>
      </tr>
      <tr>
        <td class="label">$obs.label.extraTemp2</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].extraTemp2.maxtime">
            $archive[1].extraTemp2.max.format(add_label=False)</span><br/>
          <span title="$archive[1].extraTemp2.mintime">
            $archive[1].extraTemp2.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.extraTemp2</td>
      </tr>
      <tr>
        <td class="label">$obs.label.extraHumid2</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].extraHumid2.maxtime">
            $archive[1].extraHumid2.max.format(add_label=False)</span><br/>
          <span title="$archive[1].extraHumid2.mintime">
            $archive[1].extraHumid2.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.extraHumid2</td>
      </tr>
      <tr>
        <td class="label">$obs.label.inTemp</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].inTemp.maxtime">
            $archive[1].inTemp.max.format(add_label=False)</span><br/>
          <span title="$archive[1].inTemp.mintime">
            $archive[1].inTemp.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.inTemp</td>
      </tr>
      <tr>
        <td class="label">$obs.label.extraTemp3</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].extraTemp3.maxtime">
            $archive[1].extraTemp3.max.format(add_label=False)</span><br/>
          <span title="$archive[1].extraTemp3.mintime">
            $archive[1].extraTemp3.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.extraTemp3</td>
      </tr>
      <tr>
        <td class="label">Wind Max</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].wind.maxtime">
            $archive[1].wind.max.format(add_label=False)</span><br/>
          $archive[1].wind.gustdir.ordinal_compass
        </td>
        #end for
        <td class="units">
          $unit.label.wind<br/>
          $unit.label.NONE
        </td>
      </tr>
      <tr>
        <td class="label">$obs.label.rain</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          $archive[1].rain.sum.format(add_label=False)</td>
        #end for
        <td class="units">$unit.label.rain</td>
      </tr>
      <tr>
        <td class="label">$obs.label.heatindex</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].heatindex.maxtime" class="hival">
            $archive[1].heatindex.max.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.heatindex</td>
      </tr>
      <tr>
        <td class="label">$obs.label.windchill</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].windchill.mintime" class="loval">
            $archive[1].windchill.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.windchill</td>
      </tr>
      <tr>
        <td class="label">Wind Average</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          $archive[1].wind.avg.format(add_label=False)</td>
        #end for
        <td class="units">$unit.label.wind</td>
      </tr>
      <tr>
        <td class="label">$obs.label.rainRate</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].rainRate.maxtime">
            $archive[1].rainRate.max.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.rainRate</td>
      </tr>
      <tr>
        <td class="label">$obs.label.outHumidity</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].outHumidity.maxtime">
            $archive[1].outHumidity.max.format(add_label=False)</span><br/>
          <span title="$archive[1].outHumidity.mintime">
            $archive[1].outHumidity.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.outHumidity</td>
      </tr>
      <tr>
        <td class="label">$obs.label.barometer</td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          <span title="$archive[1].barometer.maxtime">
            $archive[1].barometer.max.format(add_label=False)</span><br/>
          <span title="$archive[1].barometer.mintime">
            $archive[1].barometer.min.format(add_label=False)</span>
        </td>
        #end for
        <td class="units">$unit.label.barometer</td>
      </tr>
      <tr>
        <td class="label">
          Vector Average<br/>
          Average Direction
        </td>
        #for $archive in $archive_data
        <td class="data new_row hilo_$archive[0]">
          $archive[1].wind.vecavg.format(add_label=False)<br/>
          $archive[1].wind.vecdir.ordinal_compass
        </td>
        #end for
        <td class="units">
          $unit.label.wind<br/>
          $unit.label.NONE
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
