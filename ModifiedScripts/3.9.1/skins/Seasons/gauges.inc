## sun/moon rise/set module for weewx skins
## Copyright Tom Keffer, Matthew Wall
## See LICENSE.txt for your rights
#errorCatcher Echo

<div id="content">
                <div id="about">
                <div class="header">Current Weather:</div>
                <div id="Gauges">
                    <canvas id="CurrTemp"></canvas>
                    <canvas id="WindChill"></canvas>
                    <canvas id="Humidity"></canvas>
                    <canvas id="Barometer"></canvas>
                    <canvas id="Compass"></canvas>
                    <canvas id="WindSpeed"></canvas>
                </div> <!-- End id "Gauges" -->
                <script type="text/javascript">
                    drawGauge
                    ({
                        Canvas      : 'CurrTemp',
                        MinValue    :   -10 ,
                        MaxValue    :    40 ,
                        MajorTicks  : ['-10','0','10','20','30','40'],
                        TitleText   : 'Temperature',
                        UnitsText   : '°C',
                        LcdFormat   : { Integer     : 2,
                                        Fraction    : 1
                                      },
                        Needle      : { Value : $current.outTemp.formatted },
                        Highlights  : [{
                                        From    : -10,
                                        To      :  10,
                                        Colour  : 'LightBlue'
                                      },
                                      {
                                        From    :  10,
                                        To      :  30,
                                        Colour  : 'PaleGreen'
                                      },
                                      {
                                        From    :  30,
                                        To      :  40,
                                        Colour  : 'LightSalmon'
                                      }]
                    });
                    drawGauge
                    ({
                        Canvas      : 'WindChill',
                        MinValue    :   -10,
                        MaxValue    :    40,
                        MajorTicks  : ['-10','0','10','20','30','40'],
                        TitleText   : 'Wind Chill',
                        UnitsText   : '°C',
                        LcdFormat   : { Integer     : 2,
                                        Fraction    : 1
                                      },
                        Needle      : { Value : $current.windchill.formatted  },
                        Highlights  : [{
                                        From    : -10,
                                        To      :  10,
                                        Colour  : 'LightBlue'
                                      },
                                      {
                                        From    :  10,
                                        To      :  30,
                                        Colour  : 'PaleGreen'
                              },
                              {
                                From    :  30,
                                To      :  40,
                                Colour  : 'LightSalmon'
                              }]
                    });
                    drawGauge
                    ({
                        Canvas      : 'Humidity',
                        TitleText   : 'Humidity',
                        UnitsText   : '%',
                        LcdFormat   : { Integer     : 2,
                                        Fraction    : 1
                                      },
                        Needle      : { Value       :  $current.outHumidity.formatted,
                                        StartColour : 'lightgreen',
                                        EndColour   : 'navy' },
                        Colours     : { MajorTick   : 'darkgreen',
                                        MinorTick   : 'lightgreen',
                                        Plate       : 'lightyellow',
                                        Title       : 'green',
                                        Units       : 'darkgreen',
                                        Number      : 'darkgreen'
                                      }
                    });
                    drawBarometer
                    ({
                        Canvas      : 'Barometer',
                        Value       :  $current.barometer.formatted,
                        Trend       : #if $trend.barometer.raw > 2.0
                                        'Rising Rapidly'
                                      #else if $trend.barometer.raw >  0.7
                                        'Rising Slowly'
                                      #else if $trend.barometer.raw < -2.0
                                        'Falling Rapidly'
                                      #else if $trend.barometer.raw < -0.7
                                        'Falling Slowly'
                                      #else
                                        'Steady'
                                      #end if
                    });
                    drawCompass
                    ({
                        Canvas      :  'Compass',
                        Needle      : { Value       : "$current.windDir.raw"
                                      }
                    });
                    drawGauge
                    ({
                        Canvas      : 'WindSpeed',
                        TitleText   : 'Wind Speed',
                        UnitsText   : 'MPH',
                        MinValue    :    0,
                        MaxValue    :   60,
                        MajorTicks  : ['0','15','30','45','60'],
                        MinorTicks  :   15,
                        LcdFormat   : { Integer     : 3,
                                        Fraction    : 0
                                      },
                        Needle      : { Value       : $current.windSpeed.formatted,
                                        MaxValue    : $day.wind.max.formatted }
                    });
                </script>
            </div> <!-- End id "about" -->
            
