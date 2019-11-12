/* *****************************************************************************

 The MIT License (MIT)

 Copyright (c) <2014> <Mike Revitt>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 *******************************************************************************
 * File Name   : WeatherGauges.js
 * Author      : Mike Revitt
 * Date        : 10-Feb-2014
 * System      : HTML Weather Gauges
 * Sub-System  : weewx
 * Module Type : Java Script
 *******************************************************************************
 *  Revision History    Push Down List
 *
 * Date         | Version # | Name      | Description
 *--------------+-----------+-----------+---------------------------------------
 *              |           |           |
 * 31-Mar-2017  | MR-01.06  | M Revitt  | LCD Box was not rendering properly with
 *              |           |           | latest OSX update
 * 25-Mar-2014  | MR-01.05  | M Revitt  | Fixed a bug where the compass would cause
 *              |           |           | no gagues to display when no data was 
 *              |           |           | passed due to no wind blowing
 * 17-Mar-2014  | MR-01.04  | M Revitt  | Added a Compass to the file
 * 27-Feb-2014  | MR-01.03  | M Revitt  | Added a Barometer to the file
 * 22-Feb-2014  | MR-01.02  | M Revitt	| Fixed a bug that prevented 0 values from
 *              |           |           | being passed through
 * 20-Feb-2014	| MR-01.02  | M Revitt	| Improved the 3D effects
 * 10-Feb-2012  | MR-01.01  | M Revitt  | Initial Creation
 *              |           |           |
 *--------------+-----------+-----------+---------------------------------------

 Description:   Creates a 3D affect gagues, that is displayed in an HTML5
                canvas.

 Parameters:    All parameters are optional with the exception of the Canvas name
                which must match the name of a valid canvas within the HTML5 file
                that calls this routine.
 
                Refer to WeatherGauges.html for examples on call methods
 
 If you need to debug this then add the following command to the HTML
 
        <p id="debug"></p>

 And this command to this script
 
        document.getElementById("debug").innerHTML = "Debug Statements";


 *******************************************************************************
 Routine Name:  Declaration Section

 Description:   This is where all the constants are defined

 Arguments:     IN:     None
                OUT:    None

 **************************************************************************** */
const   BEVEL_OUTER0_COLOURS        = ['#B4B4B4',
                                       '#BBBBBB',
                                       '#C2C2C2',
                                       '#C9C9C9',
                                       '#CFCFCF',
                                       '#D6D6D6',
                                       '#DDDDDD',
                                       '#E4E4E4',
                                       '#EBEBEB',
                                       '#F1F1F1',
                                       '#F8F8F8',
                                       '#FFFFFF'];

const   BEVEL_OUTER1_COLOURS        = ['#818181',
                                       '#888888',
                                       '#8F8F8F',
                                       '#969696',
                                       '#9C9C9C',
                                       '#A3A3A3',
                                       '#AAAAAA',
                                       '#B1B1B1',
                                       '#B8B8B8',
                                       '#BEBEBE',
                                       '#C5C5C5',
                                       '#CCCCCC'];

const   BEVEL_INNER0_COLOURS        = ['#FFFFFF',
                                       '#F8F8F8',
                                       '#F1F1F1',
                                       '#EBEBEB',
                                       '#E4E4E4',
                                       '#DDDDDD',
                                       '#D6D6D6',
                                       '#CFCFCF',
                                       '#C9C9C9'];

const   BEVEL_INNER1_COLOURS        = ['#CCCCCC',
                                       '#C5C5C5',
                                       '#BEBEBE',
                                       '#B8B8B8',
                                       '#B1B1B1',
                                       '#AAAAAA',
                                       '#A3A3A3',
                                       '#9C9C9C',
                                       '#969696'];

const   BAROMETER_OUTER0_COLOURS    = ['#B09269',
                                       '#B69A70',
                                       '#BCA277',
                                       '#C3AA7E',
                                       '#C9B285',
                                       '#D0BA8C',
                                       '#D6C293',
                                       '#DCCA9A',
                                       '#E3D2A1',
                                       '#E9DAA8',
                                       '#F0E2AF',
                                       '#F6EAB6'];

const   BAROMETER_OUTER1_COLOURS    = ['#756749',
                                       '#7e7050',
                                       '#877957',
                                       '#91825F',
                                       '#9A8B66',
                                       '#A4946E',
                                       '#AD9D75',
                                       '#B6A67C',
                                       '#C0AF84',
                                       '#C9B88B',
                                       '#D3C193',
                                       '#DCCA9A'];

const   BAROMETER_INNER0_COLOURS    = ['#F6EAB6',
                                       '#F0E2AF',
                                       '#E9DAA8',
                                       '#E3D2A1',
                                       '#DCCA9A',
                                       '#D6C293',
                                       '#D0BA8C',
                                       '#C9B285',
                                       '#C3AA7E'];

const   BAROMETER_INNER1_COLOURS    = ['#DCCA9A',
                                       '#D3C193',
                                       '#C9B88B',
                                       '#C0AF84',
                                       '#B6A67C',
                                       '#AD9D75',
                                       '#A4946E',
                                       '#9A8B66',
                                       '#91825F'];

const   BAROMETER_CAP_COLOUR0       = ['#696855',
                                       '#626150',
                                       '#5A5A4A',
                                       '#525445',
                                       '#4B4D40',
                                       '#44463A',
                                       '#404338',
                                       '#383C33'];

const   BAROMETER_CAP_COLOUR1       = ['#525445',
                                       '#4B4D40',
                                       '#44463A',
                                       '#3C3F35',
                                       '#343830',
                                       '#2D322B',
                                       '#262B25',
                                       '#1E2420'];

const   DEFAULT_NUMBER_COLOUR           = '#444444';
const   DEFAULT_TICK_COLOUR             = '#444444';
const   DEFAULT_TITLE_COLOUR            = '#888888';
const   BAROMETER_PLATE_COLOUR          = '#BECAC0';
const   BAROMETER_FONT_COLOUR           = '#001E02';
const   LCD_PANEL_COLOUR                = '#BABAB2';
const   LCD_RING_COLOUR                 = '#666666';
const   LCD_TEXT_COLOUR                 = '#444444';
const   NEEDLE_CENTER_COLOUR0           = '#F0F0F0';
const   NEEDLE_CENTER_COLOUR1           = '#CCCCCC';
const   NEEDLE_OUTER_COLOUR0            = '#E8E8E8';
const   NEEDLE_OUTER_COLOUR1            = '#F5F5F5';
const   PLATE_COLOUR                    = '#FFFFF0';
const   UNITS_COLOUR                    = '#888888';

const   BAROMETER_NEEDLE_START_COLOUR   = 'rgba( 63, 75, 64, 1 )';
const   BAROMETER_NEEDLE_END_COLOUR     = 'rgba( 30, 36, 32, 1 )';
const   NEEDLE_END_COLOUR               = 'rgba( 255, 51, 51, .9 )';
const   NEEDLE_MAX_COLOUR               = 'rgba( 255, 51, 51, ';
const   NEEDLE_START_COLOUR             = 'rgba( 200, 0, 0, 1 )';

const   BAROMETER_CAP_START_RADIUS      =    9;
const   GAUGE_CAP_START_RADIUS          =   14;
const   GAUGE_DEC                       =    0;
const   GAUGE_INT                       =    3;
const   GAUGE_SCALE_END                 =  315;
const   GAUGE_SCALE_LENGTH              =  270;
const   GAUGE_SCALE_START               =   45;
const   GAUGE_START_RADIUS              =   95;

const   ALIGN_TEXT_CENTRALLY            = 'center';
const   ALIGN_TEXT_MIDDLE               = 'middle';
const   BASE_SIXTEEN                    =  16;
const   BASE_TEN                        =  10;
const   CANVAS_LINE_CAP                 = 'round';
const   CONVERT_TO_PCT                  =  100;
const   ROTATE_ANTICLOCKWISE            = -1;
const   NO_VALUE_PASSED                 = 'undefined';

const   ZERO_DEGREES                    =  0;
const   TEN_DEGREES                     =  10;
const   FORTY_FIVE_DEGREES              =  45;
const   NINETY_DEGREES                  =  90;
const   ONE_EIGHTY_DEGRESS              =  180;
const   THREE_FIFTY_DEGREES             =  350;
const   THREE_SIXTY_DEGREES             =  360;

const   FORTY_PERCENT                   = (40/100);
const   FIFTY_PERCENT                   = (50/100);
const   SEVENTY_FIVE_PERCENT            = (75/100);
const   ONE_HUNDRED_PERCENT             = (100/100);

const   BAROMETER_FONT                  = 'px Verdana';
const   GAUGE_FONT                      = 'px Arial';
const   LCD_DISPLAY_FONT                = 'px Digital7';
const   COMPASS_POINTS_FONT             = 'px px Georgia';

const   ZERO_DEGREES_RADIAN             =  0;
const   FORTY_FIVE_DEGREES_RADIAN       =  0.25 * Math.PI;
const   NINETY_DEGREES_RADIAN           =  0.5 * Math.PI;
const   ONE_EIGHTY_DEGRESS_RADIAN       =  1.0 * Math.PI;
const   THREE_SIXTY_DEGREES_RADIAN      =  2.0 * Math.PI;

const   GAUGE_SHADOW_BLUR_PCT           =   (6/100);
const   NEEDLE_SHADOW_BLUR_PCT          =   (4/100);
const   LCD_SHADOW_BLUR_PCT             =  (12/1000);

const   BAROMETER_TEXT_RADIUS_PCT       =  (38/100);
const   BAROMETER_TREND_RADIUS_PCT      =  (40/100);
const   BAROMETER_UNITS_RADIUS_PCT      =  (72/100);
const   BAROMETER_NUMBERS_RADIUS_PCT    =  (70/100);
const   BOX_CORNER_RADIUS_PCT           =  (25/1000);
const   COMPASS_SCALE_RADIUS_PCT        =  (59/100);
const   COMPASS_NUMBERS_RADIUS_PCT      =  (70/100);
const   COMPASS_DIAMOND_RADIUS_PCT      =  (80/100);
const   COMPASS_DIAMOND_N_RADIUS_PCT    =  (83/100);
const   GAUGE_NUMBERS_RADIUS_PCT        =  (55/100);
const   GAUGE_SCALE_RADIUS_PCT          =  (81/100);
const   GAUGE_TITLE_RADIUS_PCT          =  (25/100);
const   GAUGE_UNITS_RADIUS_PCT          =  (40/100);

const   BAROMETER_SCALE_OFFSET          =  (85/100);
const   LCD_BOX_Y_OFFSET_PCT            =  (33/100);
const   LCD_SHADOW_OFFSET_PCT           =  (4/1000);

const   GAUGE_MAJOR_TICK_LEN_PCT        =  (15/100);
const   GAUGE_MAJOR_TICK_WIDTH_PCT      =  (01/100);
const   GAUGE_MINOR_TICK_LEN_PCT        =  (75/1000);
const   GAUGE_MINOR_TICK_WIDTH_PCT      =  (05/1000);
const   LCD_HALF_TEXT_WIDTH             =  (50/100);

// Needle Dimensions
const   GAUGE_CENTRE_WIDTH_PCT          =  (06/100);
const   GAUGE_TAIL_LENGTH_PCT           =  (30/100);
const   GAUGE_TIP_LENGTH_PCT            =  (77/100);
const   GAUGE_TIP_WIDTH_PCT             =  (01/100)
const   GAUGE_TAIL_WIDTH_PCT            =  (03/100);

// Barometer Needle Dimensions
const   BAROMETER_NEEDLE_TIP_WIDTH_PCT  =  GAUGE_MAJOR_TICK_WIDTH_PCT / 2;
const   BAROMETER_NEEDLE_TAIL_WIDTH_PCT =  BAROMETER_NEEDLE_TIP_WIDTH_PCT * 2;
const   NEEDLE_ARROW_TIP_Y_COORD_PCT    =  (62/100);
const   NEEDLE_ARROW_TAIL_Y_COORD_PCT   =  (51/100);
const   NEEDLE_ARROW_WIDTH_X_COORD_PCT  =   (6/100);
const   NEEDLE_ARROW_WIDTH_Y_COORD_PCT  =  (49/100);
const   NEEDLE_TAIL_OUTER_RADIUS_PCT    =   (5/100);
const   NEEDLE_TAIL_INNER_RADIUS_PCT    =  (41/1000);
const   NEEDLE_TAIL_OUTER_Y_COORD_PCT   =  (55/100);
const   NEEDLE_TAIL_INNER_Y_COORD_PCT   = (575/1000);

const   BAROMETER_HEADING_FONT_PCT      =  (14/100);
const   BAROMETER_NUMBERS_FONT_PCT      =   (9/100);
const   BAROMETER_TREND_FONT_PCT        =  (11/100)
const   BAROMETER_UNITS_FONT_PCT        =   (8/100);
const   COMPASS_NUMBERS_FONT_PCT        =   (6/100);
const   COMPASS_MAJOR_POINT_FONT_PCT    =  (12/100);
const   COMPASS_MINOR_POINT_FONT_PCT    =  (07/100);
const   COMPASS_NORTH_FONT_PCT          =  (12/100);
const   LCD_TEXT_FONT_PCT               =  (20/100);
const   LCD_TEXT_HEIGHT_PCT             = (135/1000);
const   NUMBERS_FONT_PCT                =  (10/100);
const   TITLE_FONT_PCT                  =  (12/100);
const   UNITS_FONT_PCT                  =  (11/100);

const   BAROMETER_HEADINGS              = ['RAIN','CHANGE','FAIR'];
const   BAROMETER_UNITS                 =  'Millibars';
const   NEDDLE_MAX_TRANSPARENCY         = [ 0.8, 0.6, 0.4, 0.3, 0.2, 0.1, 0.05, 0.01 ];

const   CLEAR_SHADOW                    = 'rgba( 0, 0, 0, 0)';
const   LCD_PANEL_SHADOW                = 'rgba( 0, 0, 0, 1 )';
const   GAUGE_SHADOW                    = 'rgba( 0, 0, 0, 0.30 )';

const   CALL_FONT_TIMEOUT               =  1000; // miliseconds

// Needle Dimensions
const   COMPASS_MINOR_TICK_INCREMENT    = 2;
const   COMPASS_MAJOR_TICK_INCREMENT    = 20;
const   COMPASS_NUMBER_TICK_LEN_PCT     =  (9/100);

const   COMPASS_NORTH_COLOUR            = '#FF0000';
const   COMPASS_START_COLOUR            = '#C80000';
const   COMPASS_END_COLOUR              = '#1E90FF';

const   COMPASS_STAR_TIP_LENGTH_PCT     =  (45/100);
const   COMPASS_TIP_LENGTH_PCT          =  (60/100);
const   COMPASS_TAIL_WIDTH_PCT          =  (06/100);
const   COMPASS_MIDDLE_SHADDOW_Y_PCT    =  (53/1000);
const   COMPASS_MIDDLE_SHADDOW_X_PCT    =  (53/1000);
const   COMPASS_STAR_COLOUR             =  '#AAAAAA';
const   COMPASS_STAR_INCREMENT          = NINETY_DEGREES;
const   CENTRE_X_COORD                  = 0;
const   CENTRE_Y_COORD                  = 0;
const   COMPASS_MAJOR_POINTS            = ['S','W','N','E'];
const   COMPASS_MINOR_POINTS            = ['SW','NW','NE','SE'];
const   COMPASS_MAJOR_POINTS_RADIUS_PCT = (50/100);
const   COMPASS_MINOR_POINTS_RADIUS_PCT = (40/100);

/* *****************************************************************************
 Routine Name:  drawGauge

 Description:   This is effectively Main. this is what you call from HTML5.
                All parameters except Canvas are optional.
                All parameters are case sensitive

 Arguments:
        IN:     Canvas      : '[From HTML5]',
                TitleText   : '[Free Text]',
                UnitsText   : '[Free Text]',
                Radius      :  '100',
                MinValue    :    '0',
                MaxValue    :  '100',
                MajorTicks  :  ['0','20','40','60','80','100'],
                MinorTicks  :   '10',
                Needle      :   {   Value       : [Where you want the needle to point],
                                    MaxValue    : [Optional max value for blurred image],
                                    StartColour : 'lightgreen',
                                    EndColour   : 'navy'
                                },
                LcdFormat   :   {   Integer     : lLcdFormats.Integer   || GAUGE_INT,
                                    Fraction    : lLcdFormats.Fraction  || GAUGE_DEC
                      		};
                Highlights  :  [{   From    :   '0',
                                    To      :  '20',
                                    Colour  : 'LightBlue'
                                },
                                {   From    :  '20',
                                    To      :  '60',
                                    Colour  : 'PaleGreen'
                                },
                                {   From    :  '60',
                                    To      : '100',
                                    Colour  : 'LightSalmon'
                                }],
                Colours     :   {   MajorTick   : 'darkgreen',
                                    MinorTick   : 'darkgreen',
                                    Plate       : 'lightyellow',
                                    Number      : 'darkgreen',
                                    Title       : 'green',
                                    Units       : 'darkgreen'
                                }

       OUT:     None

 **************************************************************************** */
function drawGauge( Options )
{
    var ctx,
        lOptions    = Options               || {},
        lCanvas     = lOptions.Canvas       || null,
        lTitleText  = lOptions.TitleText    || false,
        lUnitsText  = lOptions.UnitsText    || false,
        lRadius     = lOptions.Radius       || 100,
        lMinValue   = lOptions.MinValue     ||   0,
        lMaxValue   = lOptions.MaxValue     || 100,
        lMajorTicks = lOptions.MajorTicks   || ['0', '20', '40', '60', '80', '100'],
        lMinorTicks = lOptions.MinorTicks   ||  10,
        lHighlights = lOptions.Highlights   ||  {},
        lNeedles    = lOptions.Needle       ||  {},
        lLcdFormats = lOptions.LcdFormat    ||  {},
        lColours    = lOptions.Colours      ||  {};

    var lNeedle     = { Value       : lNeedles.Value        || lMinValue,
                        MaxValue    : lNeedles.MaxValue     || lMinValue,
                        StartColour : lNeedles.StartColour  || NEEDLE_START_COLOUR,
                        EndColour   : lNeedles.EndColour    || NEEDLE_END_COLOUR
                      };

    var lLcdFormat  = { Integer     : lLcdFormats.Integer   || GAUGE_INT,
                        Fraction    : lLcdFormats.Fraction  || GAUGE_DEC
                      };
    
    var lColour     = { MajorTick   : lColours.MajorTick    || DEFAULT_TICK_COLOUR,
                        MinorTick   : lColours.MinorTick    || DEFAULT_TICK_COLOUR,
                        Plate       : lColours.Plate        || PLATE_COLOUR,
                        Number      : lColours.Number       || DEFAULT_NUMBER_COLOUR,
                        Title       : lColours.Title        || DEFAULT_TITLE_COLOUR,
                        Units       : lColours.Units        || UNITS_COLOUR
                      };

    ctx = InitCanvas( lCanvas, lRadius );
    drawPlate( ctx, lRadius, lColour );
    drawHighlights( ctx, lRadius, lMaxValue, lMinValue, lHighlights, lColour );
    drawMinorTicks( ctx, lRadius, lMajorTicks, lColour, lMinorTicks );
    drawMajorTicks( ctx, lRadius, lMajorTicks, lColour );
    drawNumbers( ctx, lRadius, lMajorTicks, lColour );
    drawTitle( ctx, lRadius, lTitleText, lColour );
    drawUnits( ctx, lRadius, lUnitsText, lColour );
    setNeedleValue( ctx, lRadius, lMaxValue, lMinValue, lNeedle );
    setNeedleMax( ctx, lRadius, lMaxValue, lMinValue, lNeedle );
    drawNeedleCap( ctx, lRadius, BEVEL_OUTER0_COLOURS, BEVEL_OUTER1_COLOURS, GAUGE_CAP_START_RADIUS );
    drawValueBox( ctx, lRadius, lMinValue, lNeedle.Value, lLcdFormat );
};
/* *****************************************************************************
 Routine Name:  InitCanvas

 Description:   Binds the Java Script to the canvas name that is passed in

 Arguments:
        IN:     pCanvas     : The name of the canvase as defined in HTML5
                pRadius     : The radius of the gauge
       OUT:     ctx         : The tag that will be used to modify the canvas in
                              all future functions.
 **************************************************************************** */
function InitCanvas( pCanvas, pRadius )
{
    var canvas      = document.getElementById( pCanvas ),
        ctx         = canvas.getContext("2d"),
        lDiameter   = pRadius * 2;

    canvas.width  = lDiameter;
    canvas.height = lDiameter;

    // translate canvas to have 0,0 in center
    ctx.translate( pRadius, pRadius );
    ctx.lineCap   = CANVAS_LINE_CAP;
    ctx.textAlign = ALIGN_TEXT_CENTRALLY;
    ctx.save();

    return ctx;
};
/* *****************************************************************************
 Routine Name:  drawPlate

 Description:   Draws the 3D bevel and background of the gauge

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawPlate( pCtx, pRadius, pColour )
{
    var lGaugeRadius    = 0
        StartPoint      = 0,
        EndPoint        = THREE_SIXTY_DEGREES_RADIAN,
        lBevel0Colours  = BEVEL_OUTER0_COLOURS,
        lBevel1Colours  = BEVEL_OUTER1_COLOURS,
        lBevelRadius    = GAUGE_START_RADIUS * 2,   // So we can decrement in 1/2 percents
        Blurr0          = pRadius * GAUGE_SHADOW_BLUR_PCT;

    SetShadow({ Ctx : pCtx, ShadowBlur : Blurr0, ShadowColour : GAUGE_SHADOW });

    for( var i = 0; i < lBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius * ( lBevelRadius--  / ( CONVERT_TO_PCT * 2 )));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( lBevel0Colours[i], lBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();
        
        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
       }
    }
    lBevel0Colours  = BEVEL_INNER0_COLOURS;
    lBevel1Colours  = BEVEL_INNER1_COLOURS;

    for( var i = 0; i < lBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius  * ( lBevelRadius-- / ( CONVERT_TO_PCT * 2 )));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( lBevel0Colours[i], lBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();
        
        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
        }
    }
    lGaugeRadius = ( pRadius  * ( lBevelRadius-- / ( CONVERT_TO_PCT * 2 )));
    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
    pCtx.fillStyle = pColour.Plate;
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawHighlights

 Description:   Draws a graduated colour scale around the number scale.
                There is no limit to the number and colours of the gradiants
                If the pHighlights array is null then this function does nothing

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMaxValue   : The maximum value for the gauge
                pMinValue   : The minimum value for the gague
                pHighlights : The array containing the highlights information
                pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawHighlights( pCtx, pRadius, pMaxValue, pMinValue, pHighlights, pColour )
{
    var i,
        lRadius1 = pRadius * GAUGE_SCALE_RADIUS_PCT,
        lRadius2 = lRadius1 - pRadius * GAUGE_MAJOR_TICK_LEN_PCT;

    for( i = 0;  i < pHighlights.length; i++ )
    {
        var hlt = pHighlights[i];

        var vd = ( pMaxValue - pMinValue ) / GAUGE_SCALE_LENGTH,
            sa = radians( GAUGE_SCALE_START + ( hlt.From - pMinValue ) / vd ),
            ea = radians( GAUGE_SCALE_START + ( hlt.To - pMinValue ) / vd );
         
        pCtx.beginPath();
        pCtx.rotate( radians( NINETY_DEGREES ));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lRadius1, sa, ea, false );
        pCtx.restore();
        pCtx.save();

        var ps = rpoint( lRadius2, sa),
            pe = rpoint( lRadius1, sa);

        pCtx.moveTo( ps.x, ps.y);
        pCtx.lineTo( pe.x, pe.y);
 
        var ps1 = rpoint( lRadius1, ea),
            pe1 = rpoint( lRadius2, ea);

        pCtx.lineTo( ps1.x, ps1.y);
        pCtx.lineTo( pe1.x, pe1.y);
        pCtx.lineTo( ps.x, ps.y);
 
        pCtx.closePath();
 
        pCtx.fillStyle = hlt.Colour;
        pCtx.fill();
 
        pCtx.beginPath();
        pCtx.rotate( radians( NINETY_DEGREES ));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lRadius2, sa - 0.2, ea + 0.2, false);
        pCtx.restore();
 
        pCtx.closePath();
 
        pCtx.fillStyle = pColour.Plate
        pCtx.fill();
        pCtx.save();
    }
 };
/* *****************************************************************************
 Routine Name:  drawMajorTicks

 Description:   Draws the long ticks around the number scale.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMajorTicks : The array containing the ticks to be drawn
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawMajorTicks( pCtx, pRadius, pMajorTicks, pColour )
{
    var lRadius = pRadius * GAUGE_SCALE_RADIUS_PCT;
    
    pCtx.restore();
    pCtx.lineWidth = pRadius * GAUGE_MAJOR_TICK_WIDTH_PCT;
    pCtx.strokeStyle = pColour.MajorTick;
    pCtx.save();

    for ( var i = 0; i < pMajorTicks.length; ++i )
    {
        var a = GAUGE_SCALE_START + i * ( GAUGE_SCALE_LENGTH / ( pMajorTicks.length - 1 ));

        pCtx.rotate( radians( a ));
        
        pCtx.beginPath();
        pCtx.moveTo( CENTRE_X_COORD, lRadius );
        pCtx.lineTo( CENTRE_X_COORD, lRadius - pRadius * GAUGE_MAJOR_TICK_LEN_PCT );
        pCtx.stroke();
        pCtx.restore();
        pCtx.save();
        
    }
    /* Draw Line outside ticks */
    pCtx.rotate( radians( NINETY_DEGREES ));
    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lRadius, radians( GAUGE_SCALE_START ), radians( GAUGE_SCALE_END ), false);
    pCtx.stroke();
    pCtx.restore();
    pCtx.save();
};
/* *****************************************************************************
 Routine Name:  drawMinorTicks

 Description:   Draws the short ticks around the number scale.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMajorTicks : The array containing the ticks to be drawn
                pColour     : The array containing all gauge colours
                pMinorTicks : The number of minor ticks between the major ticks
       OUT:     None
 **************************************************************************** */
function drawMinorTicks( pCtx, pRadius, pMajorTicks, pColour, pMinorTicks )
{
    var lRadius = pRadius * GAUGE_SCALE_RADIUS_PCT;
    
    pCtx.restore();
    pCtx.lineWidth = pRadius * GAUGE_MINOR_TICK_WIDTH_PCT;
    pCtx.strokeStyle = pColour.MinorTick;
    pCtx.save();
    
    var len = pMinorTicks * ( pMajorTicks.length - 1 );
    
    for (var i = 0; i < len; ++i)
    {
        var a = GAUGE_SCALE_START + i * ( GAUGE_SCALE_LENGTH / len );
        pCtx.rotate( radians( a ));
        
        pCtx.beginPath();
        pCtx.moveTo( CENTRE_X_COORD, lRadius );
        pCtx.lineTo( CENTRE_X_COORD, lRadius - pRadius * GAUGE_MINOR_TICK_LEN_PCT );
        pCtx.stroke();
        
        pCtx.restore();
        pCtx.save();
    }
};
/* *****************************************************************************
 Routine Name:  drawNumbers

 Description:   Draws the numbers around the number scale.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMajorTicks : The array containing the ticks to be drawn
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawNumbers( pCtx, pRadius, pMajorTicks, pColour )
{
    var lRadius             = pRadius * GAUGE_NUMBERS_RADIUS_PCT,
        lAlignTextMiddle    = pRadius * NUMBERS_FONT_PCT * FORTY_PERCENT;

    for( var i = 0; i < pMajorTicks.length; ++i )
    {
        var a = GAUGE_SCALE_START + i * ( GAUGE_SCALE_LENGTH / ( pMajorTicks.length - 1 )),
            p = rpoint( lRadius, radians( a ));

        pCtx.font      = pRadius * NUMBERS_FONT_PCT + GAUGE_FONT;
        pCtx.fillStyle = pColour.Number;
        pCtx.fillText( pMajorTicks[i], p.x, p.y + lAlignTextMiddle );
    }
};
/* *****************************************************************************
 Routine Name:  drawTitle

 Description:   Draws the title at the top of the gauge.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pTitleText  : The text to appear at the top of the gauge
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawTitle( pCtx, pRadius, pTitleText, pColour )
{
    if( false == pTitleText )
    {
        return;
    }
    else
    {
        pCtx.save();
        pCtx.font = pRadius * TITLE_FONT_PCT + GAUGE_FONT;
        pCtx.fillStyle = pColour.Title;
        pCtx.fillText( pTitleText, CENTRE_X_COORD, pRadius * GAUGE_TITLE_RADIUS_PCT * ROTATE_ANTICLOCKWISE );
        pCtx.restore();
    }
};
/* *****************************************************************************
 Routine Name:  drawUnits

 Description:   Draws the units of the scale at the bottom of the gauge.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pUnitsText  : The text to appear at the bottom of the gauge
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawUnits( pCtx, pRadius, pUnitsText, pColour )
{
    if( false == pUnitsText )
    {
        return;
    }
    else
    {
        pCtx.save();
        pCtx.font = pRadius * UNITS_FONT_PCT + GAUGE_FONT;
        pCtx.fillStyle = pColour.Units;
        pCtx.fillText( pUnitsText, CENTRE_X_COORD, pRadius * GAUGE_UNITS_RADIUS_PCT);
        pCtx.restore();
    }
};
/* *****************************************************************************
 Routine Name:  setNeedleValue

 Description:   Sets the position of the needle based on the pNeedle.Value as a
                percentage between the maximum and minimum values, then calls
                the draw needle and needle edge routines.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMaxValue   : The maximum value displayed on the gauge
                pMinValue   : The minimum value displayed on the gauge
                pNeedle     : The array containing all Needle information
       OUT:     None
 **************************************************************************** */
function setNeedleValue( pCtx, pRadius, pMaxValue, pMinValue, pNeedle )
{
    var Radians             = 0,
        lNeedleShadowBlur   = pRadius * NEEDLE_SHADOW_BLUR_PCT,
        lNeedleTipY_Coord   = pRadius * GAUGE_TIP_LENGTH_PCT,
        lNeedleTailY_Coord  = pRadius * GAUGE_TAIL_LENGTH_PCT;

    SetShadow({ Ctx : pCtx, ShadowBlur : lNeedleShadowBlur, ShadowColour : GAUGE_SHADOW });
    
    lRadians = CalculateNeedlePosition( pMaxValue, pMinValue, pNeedle.Value );
    
    pCtx.rotate( radians( lRadians ));

    pCtx.fillStyle = lgrad
    (
        pNeedle.StartColour,
        pNeedle.EndColour,
        lNeedleTipY_Coord - lNeedleTailY_Coord,
        pCtx
     );
    drawNeedle( pCtx, pRadius );
    drawNeedleEdge( pCtx, pRadius );
};
/* *****************************************************************************
 Routine Name:  setNeedleMax

 Description:   Sets the position of the maximum needles which display as a set of 
                needles in increasing transpancy based on the pNeedle.MaxValue as a
                percentage between the maximum and minimum values, then calls
                the draw needle in a loop to set the multiple positions.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMaxValue   : The maximum value displayed on the gauge
                pMinValue   : The minimum value displayed on the gauge
                pNeedle     : The array containing all Needle information
       OUT:     None
 **************************************************************************** */
function setNeedleMax( pCtx, pRadius, pMaxValue, pMinValue, pNeedle )
{
    var lValueRadians               = 0,
        lMaxRadians                 = 0,
        lRadians                    = 0,
        lNeedleIncrementInRadians   = 4,
        lNeedleShadowBlur           = pRadius * NEEDLE_SHADOW_BLUR_PCT,
        lTransparency               = NEDDLE_MAX_TRANSPARENCY;
    
    SetShadow({ Ctx : pCtx, ShadowBlur : lNeedleShadowBlur, ShadowColour : GAUGE_SHADOW });
    
    lValueRadians = CalculateNeedlePosition( pMaxValue, pMinValue, pNeedle.Value );
    lMaxRadians = CalculateNeedlePosition( pMaxValue, pMinValue, pNeedle.MaxValue );
    lRadians = lMaxRadians - lValueRadians;
    
    pCtx.rotate( radians( lRadians ));
    
    for( var i = 0; i < lTransparency.length && ( i * lNeedleIncrementInRadians ) < lRadians; ++i )
    {
        pCtx.fillStyle = NEEDLE_MAX_COLOUR + lTransparency[i] + ' )';
        drawNeedle( pCtx, pRadius );
        pCtx.rotate( radians( ROTATE_ANTICLOCKWISE * lNeedleIncrementInRadians ));
    };
};
/* *****************************************************************************
 Routine Name:  drawNeedle
 
 Description:   Draws the Needle on the Gauge.
                0,0 is the center of the gauge and the needle is drwan vertically
                with the tip pointing down.
 
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawNeedle( pCtx, pRadius )
{
    var lNeedleTipY_Coord       = pRadius * GAUGE_TIP_LENGTH_PCT,
        lNeedleTailY_Coord      = pRadius * GAUGE_TAIL_LENGTH_PCT,
        lNeedleCentreWidth      = pRadius * GAUGE_CENTRE_WIDTH_PCT,
        lNeedleTailWidth        = pRadius * GAUGE_TAIL_WIDTH_PCT,
        lNeedleTipWidth         = pRadius * GAUGE_TIP_WIDTH_PCT;

    pCtx.beginPath();
    pCtx.moveTo( -lNeedleTailWidth,    -lNeedleTailY_Coord      );
    pCtx.lineTo( -lNeedleCentreWidth,   CENTRE_Y_COORD    );
    pCtx.lineTo( -lNeedleTipWidth,      lNeedleTipY_Coord       );
    pCtx.lineTo(  lNeedleTipWidth,      lNeedleTipY_Coord       );
    pCtx.lineTo(  lNeedleCentreWidth,   CENTRE_Y_COORD    );
    pCtx.lineTo(  lNeedleTailWidth,    -lNeedleTailY_Coord      );
    pCtx.closePath();
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawNeedleEdge

 Description:   Draws the 3d effect for the Needle on the Gauge.
                0,0 is the center of the gauge and the needle is drwan vertically
                with the tip pointing down. The edge is draw on the left side with
                a transparent gray shade to give a 3d effect

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
       OUT:     None
 **************************************************************************** */
function drawNeedleEdge( pCtx, pRadius )
{
    var lNeedleTipY_Coord       = pRadius * GAUGE_TIP_LENGTH_PCT,
        lNeedleTailY_Coord      = pRadius * GAUGE_TAIL_LENGTH_PCT,
        lNeedleCentreWidth      = pRadius * GAUGE_CENTRE_WIDTH_PCT,
        lNeedleTailWidth        = pRadius * GAUGE_TAIL_WIDTH_PCT,
        lNeedleTipWidth         = pRadius * GAUGE_TIP_WIDTH_PCT;

    pCtx.beginPath();
    pCtx.moveTo( -lNeedleTailWidth,     -lNeedleTailY_Coord     );
    pCtx.lineTo( -lNeedleCentreWidth,    CENTRE_Y_COORD   );
    pCtx.lineTo( -lNeedleTipWidth,       lNeedleTipY_Coord      );
    pCtx.lineTo(  CENTRE_X_COORD,        lNeedleTipY_Coord      );
    pCtx.lineTo(  CENTRE_X_COORD,       -lNeedleTailY_Coord     );
    pCtx.closePath();
    pCtx.fillStyle = GAUGE_SHADOW;
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  CalculateNeedlePosition

 Description:   Calculates the value of the gauge taking into account the max and
                min values and works out the correct radians value on the scale
                that is drawn around the gauge between the start and end points

 Arguments:
        IN:     pMaxValue       : The maximum value displayed on the gauge
                pMinValue       : The minimum value displayed on the gauge
                pNeedleValue    : The supplied value for the needle
       OUT:     lRadians        : The display position in radians
 **************************************************************************** */
function CalculateNeedlePosition( pMaxValue, pMinValue, pNeedleValue )
{
    var lRadians        = 0,
        lNeedlePosition = Math.abs( pNeedleValue );
    
    if( pNeedleValue < 0 )
    {
        lNeedlePosition = Math.abs( pMinValue - pNeedleValue );
    }
    else if( pMinValue > 0 )
    {
        lNeedlePosition -= pMinValue;
    }
    else
    {
        lNeedlePosition = Math.abs( pMinValue ) + pNeedleValue;
    }
    lRadians = GAUGE_SCALE_START +  ( lNeedlePosition / (( pMaxValue - pMinValue ) / GAUGE_SCALE_LENGTH ));

    return lRadians;
};
/* *****************************************************************************
 Routine Name:  drawValueBox

 Description:   This routine draws the LCD display at the bottom of the gauge
                and then populates it with the supplied value that is used to
                position the needle.

        NOTE:   The actual values have to be drawn by a seperate routine
                that first waits for the fonts to be loaded by the WEB page.

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMinValue   : The minimum value of the gauge, so we know if to
                              allow room for the "-" sign
                pValue      : The supplied value for the needle
                pLcdFormat  : The array containing the decimal and integer sizes
       OUT:     None
 **************************************************************************** */
function drawValueBox( pCtx, pRadius, pMinValue, pValue, pLcdFormat )
{
    var TextWidth       = 0,
        TextX_Offset    = 0,
        LcdBoxY_Coord   = 0,
        LcdBoxX_Coord   = 0,
        lMeasureText    = "",
        lMinValue       = pMinValue,
        lValue          = pValue,
        lLcdText        = padValue( pValue, pLcdFormat ),
        lGaugeFont      = pRadius * LCD_TEXT_FONT_PCT + GAUGE_FONT,
        lLcdFont        = pRadius * LCD_TEXT_FONT_PCT + LCD_DISPLAY_FONT,
        TextHeight      = LCD_TEXT_HEIGHT_PCT * pRadius,
        TextY_Coord     = pRadius - ( pRadius  * LCD_BOX_Y_OFFSET_PCT ),
        BoxCornerRadius = BOX_CORNER_RADIUS_PCT * pRadius;

    // Required to make Measure Text accurately measure the length
    if( lMinValue   < 0
    &&  lValue      >= 0 )
    {
        lMeasureText = '-' + lLcdText;
    }
    else
    {
        lMeasureText = lLcdText;
    }
    pCtx.font       = lGaugeFont;
    TextWidth       = pCtx.measureText( lMeasureText ).width;

    // Put correct text back so it displays properly
    pCtx.font       = lLcdFont;
    LcdBoxX_Coord   = (( TextWidth * LCD_HALF_TEXT_WIDTH ) + BoxCornerRadius ) * ROTATE_ANTICLOCKWISE;
    LcdBoxY_Coord   = TextY_Coord + BoxCornerRadius;

    roundRect
    (
        pCtx,
        LcdBoxX_Coord,
        LcdBoxY_Coord,
        TextWidth + ( 2 * BoxCornerRadius ),
        TextHeight + ( 2 * BoxCornerRadius ),
        BoxCornerRadius
    );
   
    // These two lines give the LCD display edge the 3D effect
    pCtx.shadowBlur  = LCD_SHADOW_BLUR_PCT * pRadius;
    pCtx.shadowColor = LCD_PANEL_SHADOW;
    
    pCtx.fillStyle = LCD_PANEL_COLOUR;
    pCtx.fill();

    pCtx.shadowOffsetX = LCD_SHADOW_OFFSET_PCT * pRadius;
    pCtx.shadowOffsetY = LCD_SHADOW_OFFSET_PCT * pRadius;
    pCtx.shadowBlur    = LCD_SHADOW_BLUR_PCT * pRadius;
    pCtx.shadowColor   = GAUGE_SHADOW;

    WriteLedText( pCtx, lLcdText, lLcdFont, TextX_Offset, TextY_Coord );
};
/* *****************************************************************************
 Routine Name:  lgrad

 Description:   Library routine to set colour gradiants

 Arguments:
        IN:     pCtx        : The tag for the canvas
                clrFrom     : The start colour
                clrTo       : The end colour
                len         : The length for the colour gradiant
       OUT:     grad        : The value that is used to set the canvas.fillStyle
 **************************************************************************** */
function lgrad( clrFrom, clrTo, len, pCtx)
{
    var grad = pCtx.createLinearGradient( 0, 0, 0, len );

    grad.addColorStop( 0, clrFrom );
    grad.addColorStop( 1, clrTo );
    
    return grad;
};
/* *****************************************************************************
 Routine Name:  radians

 Description:   Library routine to convert degrees to radians

 Arguments:
        IN:     degrees : The angle in degrees
       OUT:     radians : The angle in radians
 **************************************************************************** */
function radians( degrees )
{
    return degrees * Math.PI / 180;
};
/* *****************************************************************************
 Routine Name:  rpoint

 Description:   Library routine to calculate the X and Y coordinates for placing
                text onto the canvas.

        NOTE:   The ':' is a delimiter for key value pairs basically.
 
                In javascript, Objects are defined with the colon delimiting the
                identifier for the property, and its value so you can have the
                following:
 
                    return{ Property1 : 125, Property2 : "something" };
 
                And then use it like
 
                    var o =  { property1 : 125, property2 : "something" };
 
                    alert( o.property1 ); // Will display "125"
 Arguments:
        IN:     pRadius : The radius of the gauge
                radians : The angle in radians
       OUT:     rpoint  : The array containing the X and Y Coordinates
 **************************************************************************** */
function rpoint( pRadius, pRadians )
{
    var sin = Math.sin( pRadians ),
        cos = Math.cos( pRadians ),
        X   = ROTATE_ANTICLOCKWISE * pRadius * sin,
        Y   = pRadius * cos;
    
    return { x : X, y : Y };
};
/* *****************************************************************************
 Routine Name:  radians

 Description:   Library routine to set the shadow for objects created on the canvas

 Arguments:
        IN:     Options : The array containing all necessary information to create
                          a shadown, only the tag for the canvas, all other values
                          are optional.
       OUT:     None
 **************************************************************************** */
function SetShadow( Options )
{
    var lOptions        = Options                   || {},
        lCtx            = lOptions.Ctx              || null,
        lShadowOffSetX  = lOptions.ShadownOffSetX   ||  0,
        lShadowOffSetY  = lOptions.ShadownOffSetY   ||  0,
        lShadowBlur     = lOptions.ShadowBlur       ||  0,
        lShadowColour   = lOptions.ShadowColour     ||  0;
    
    lCtx.shadowOffsetX = lShadowOffSetX;
    lCtx.shadowOffsetY = lShadowOffSetY;
    lCtx.shadowBlur    = lShadowBlur;
    lCtx.shadowColor   = lShadowColour;
};
/* *****************************************************************************
 Routine Name:  roundRect
 
 Description:   Draws the outline for the LCD panel at the bottom of the gauge.
 
 Arguments:
        IN:     pCtx                : The tag for the canvas
                pX_Coord            : The starting X coordinate for the box, top left corner
                pY_Coord            : The starting Y coordinate for the box, top left corner
                pBoxWidth           : The width of the box
                pBoxHeight          : the height of the box
                pBoxCornerRadius    : The radius of the box corners
       OUT:     None
 **************************************************************************** */
function roundRect( pCtx, pX_Coord, pY_Coord, pBoxWidth, pBoxHeight, pBoxCornerRadius )
{
    pCtx.beginPath();

    pCtx.moveTo( pX_Coord + pBoxCornerRadius,               pY_Coord );
    pCtx.lineTo( pX_Coord - pBoxCornerRadius + pBoxWidth,   pY_Coord );

    pCtx.quadraticCurveTo( pX_Coord + pBoxWidth, pY_Coord, pX_Coord + pBoxWidth, pY_Coord - pBoxCornerRadius );
    pCtx.lineTo(           pX_Coord + pBoxWidth, pY_Coord - pBoxHeight + pBoxCornerRadius );
    
    pCtx.quadraticCurveTo( pX_Coord + pBoxWidth, pY_Coord - pBoxHeight, pX_Coord + pBoxWidth - pBoxCornerRadius, pY_Coord - pBoxHeight );
    pCtx.lineTo(           pX_Coord + pBoxCornerRadius, pY_Coord - pBoxHeight );
    
    pCtx.quadraticCurveTo( pX_Coord, pY_Coord - pBoxHeight, pX_Coord, pY_Coord - pBoxHeight + pBoxCornerRadius );
    pCtx.lineTo(           pX_Coord, pY_Coord - pBoxCornerRadius );
    
    pCtx.quadraticCurveTo( pX_Coord, pY_Coord, pX_Coord + pBoxCornerRadius, pY_Coord );
    
    pCtx.closePath();

    pCtx.strokeStyle = LCD_RING_COLOUR;
    pCtx.lineWidth = 2 * pBoxCornerRadius;
    
    pCtx.stroke();
};
/* *****************************************************************************
 Routine Name:  padValue

 Description:   Library routine to calcualte the length of the LCD display
 
        NOTE:   The font type and size must be set before calling this routing

 Arguments:
        IN:     pValue      : The supplied value for the needle
                pLcdFormat  : The array containing the info for the LCD display
        OUT:    lValue      : the value to be used when calculating the box size
 **************************************************************************** */
function padValue( pValue, pLcdFormat )
{
    var lFraction   = pLcdFormat.Fraction;
    var lInteger    = pLcdFormat.Integer;
    var lValue      = parseFloat( pValue );
    var lPosValue   = Math.abs( lValue );
    var lQuotient   = Math.floor( lPosValue );
    var lRemainder  = lPosValue - lQuotient;
    var rQuotient   = lQuotient.toString();
    var rRemainder  = "0";
    var rReturn     = "0";
 
    for( var i = 0; rQuotient.length < lInteger; ++i )
    {
        rQuotient = '0' + rQuotient;
    }
    rReturn = rQuotient;
    
    if( lFraction > 0 )
    {
        rRemainder = lRemainder.toString().slice( 2, lFraction + 2 );
        
        for( var i = 0; rRemainder.length < lFraction; ++i )
        {
            rRemainder = rRemainder + '0';
        }
        rReturn = rQuotient + '.' + rRemainder;
    }
    
    if( lValue < 0 )
    {
        rReturn = "-" + rReturn;
    }
    return rReturn;
};
/* *****************************************************************************
 Routine Name:  WriteLedText

 Description:   This routine draws the text inside the LCD display at the bottom 
                of the gauge

        NOTE:   This is the 2nd part of the process for using imported fonts,
                and will wait for the hidden field on the web page to load the
                required front, utilising the @font-face method from the style
                sheet.

                All of the commands in the function will be excuted after the
                timout period, which is set by the constant CALL_FONT_TIMEOUT.
 
                In this case the write text command which has to wait for the
                fonts library to load.

 Arguments:
        IN:     pCtx            : The tag for the canvas
                pValue          : The supplied value for the needle
                pLcdFont        : The font to use
                TextX_Offset    : The X coordinate offset from the centre
                TextY_Coord     : The Y coordinate for the text
       OUT:     None
 **************************************************************************** */
function WriteLedText( pCtx, pValue, pLcdFont, TextX_Offset, TextY_Coord )
{
    setTimeout
    (
        function()
        {
            pCtx.restore();
            pCtx.font = pLcdFont;
            pCtx.fillStyle = LCD_TEXT_COLOUR;
            pCtx.fillText( pValue, TextX_Offset, TextY_Coord );
        },
        CALL_FONT_TIMEOUT
    );
};
/* *****************************************************************************
 Routine Name:  drawBarometer

 Description:   This is effectively Main. this is what you call from HTML5.
                All parameters except Canvas are optional.
                All parameters are case sensitive

 Arguments:
        IN:     Canvas      : '[From HTML5]',
                Value       :  The current Barometric Pressure,
                Trend       : '[Free Text - displayed at the bottom of the gauge]',
                UnitsText   : '[Free Text - displayed at the bottom of the gauge]',
                Radius      :    100,
                MinValue    :    950,
                MaxValue    :   1050,
                MajorTicks  :  ['950', '960', '970', '980', '990', '1000', '1010','1020','1030','1040','1050'],
                MinorTicks  :     10,
                Colours     : { MajorTick   : 'darkgreen',
                                MinorTick   : 'darkgreen',
                                Plate       : 'lightyellow',
                                Number      : 'darkgreen',
                                Trend       : 'green',
                                Units       : 'darkgreen'
                              };
 OUT:     None
 **************************************************************************** */
function drawBarometer( Options )
{
    var ctx,
        lOptions    = Options               ||  {},
        lCanvas     = lOptions.Canvas       ||  null,
        lValue      = lOptions.Value,
        lTrend      = lOptions.Trend        ||  false,
        lUnitsText  = lOptions.UnitsText    ||  BAROMETER_UNITS,
        lRadius     = lOptions.Radius       ||   100,
        lMinValue   = lOptions.MinValue     ||   950,
        lMaxValue   = lOptions.MaxValue     ||  1050,
        lMajorTicks = lOptions.MajorTicks   || ['950', '960', '970', '980', '990', '1000', '1010','1020','1030','1040','1050'],
        lMinorTicks = lOptions.MinorTicks   ||    10,
        lColours    = lOptions.Colours      ||  {};

    var lColour     = { MajorTick   : lColours.MajorTick    || DEFAULT_TICK_COLOUR,
                        MinorTick   : lColours.MinorTick    || DEFAULT_TICK_COLOUR,
                        Plate       : lColours.Plate        || BAROMETER_PLATE_COLOUR,
                        Number      : lColours.Number       || DEFAULT_NUMBER_COLOUR,
                        Trend       : lColours.Trend        || DEFAULT_TITLE_COLOUR,
                        Units       : lColours.Units        || UNITS_COLOUR
                      };

    // The Value has to be set here as 0 is seen as null and can't be passed through
    if( typeof lValue == 'undefined' )
    {
        lValue = lMinValue;
    }

    ctx = InitCanvas( lCanvas, lRadius );
    drawBarometerPlate( ctx, lRadius, lColour );
    drawBarometerTrend( ctx, lRadius, lTrend, lColour );
    drawMinorTicks( ctx, ( lRadius * BAROMETER_SCALE_OFFSET ), lMajorTicks, lColour, lMinorTicks );
    drawMajorTicks( ctx, ( lRadius * BAROMETER_SCALE_OFFSET ), lMajorTicks, lColour );
    WriteRadialHeadings( ctx, lRadius );
    drawBarometerNumbers( ctx, lRadius, lMajorTicks, lColour );
    drawBarometerUnits( ctx, lRadius, lUnitsText, lColour );
    setBarometerValue( ctx, lRadius, lMaxValue, lMinValue, lValue );
    drawNeedleCap( ctx, lRadius, BAROMETER_CAP_COLOUR0, BAROMETER_CAP_COLOUR1, BAROMETER_CAP_START_RADIUS  );
};
/* *****************************************************************************
 Routine Name:  drawBarometerPlate
 
 Description:   Draws the 3D bevel and background of the gauge
 
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawBarometerPlate( pCtx, pRadius, pColour )
{
    var lGaugeRadius    = 0
        StartPoint      = 0,
        EndPoint        = THREE_SIXTY_DEGREES_RADIAN,
        lBevel0Colours  = BAROMETER_OUTER0_COLOURS,
        lBevel1Colours  = BAROMETER_OUTER1_COLOURS,
        lBevelRadius    = GAUGE_START_RADIUS * 2,   // So we can decrement in 1/2 percents
        Blurr0          = pRadius * GAUGE_SHADOW_BLUR_PCT;
    
    SetShadow({ Ctx : pCtx, ShadowBlur : Blurr0, ShadowColour : GAUGE_SHADOW });
    
    for( var i = 0; i < lBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius  * ( lBevelRadius-- / ( CONVERT_TO_PCT * 2 )));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( lBevel0Colours[i], lBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();
        
        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
        }
    }
    lBevel0Colours  = BAROMETER_INNER0_COLOURS;
    lBevel1Colours  = BAROMETER_INNER1_COLOURS;
    
    for( var i = 0; i < lBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius  * ( lBevelRadius-- / ( CONVERT_TO_PCT * 2 )));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( lBevel0Colours[i], lBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();
        
        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
        }
    }
    lGaugeRadius = ( pRadius  * ( lBevelRadius-- / ( CONVERT_TO_PCT * 2 )));
    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
    pCtx.fillStyle = pColour.Plate;
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawBarometerCap

 Description:   Draws the 3D Cap and shadow for the needle

 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
       OUT:     None
 **************************************************************************** */
function drawBarometerCap( pCtx, pRadius  )
{
    var lGaugeRadius    = 0
        StartPoint      = 0,
        EndPoint        = THREE_SIXTY_DEGREES_RADIAN,
        lBevel0Colours  = BAROMETER_CAP_COLOUR0,
        lBevel1Colours  = BAROMETER_CAP_COLOUR1,
        lBevelRadius    = BAROMETER_CAP_START_RADIUS,
        Blurr0          = pRadius * GAUGE_SHADOW_BLUR_PCT;

    pCtx.restore();

    SetShadow({ Ctx : pCtx, ShadowBlur : Blurr0, ShadowColour : GAUGE_SHADOW });

    for( var i = 0; i < lBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius  * ( lBevelRadius-- / CONVERT_TO_PCT ));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( lBevel0Colours[i], lBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();

        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
        }
    }
};
/* *****************************************************************************
 Routine Name:  drawBarometerTrend

 Description:   Draws the title at the top of the gauge.

 Arguments:
        IN:     pCtx    : The tag for the canvas
                pRadius : The radius of the gauge
                pTrend  : The text to appear at the bottom of the gauge
                pColour : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawBarometerTrend( pCtx, pRadius, pTrend, pColour )
{
    if( false == pTrend )
    {
        return;
    }
    else
    {
        pCtx.save();
        pCtx.font = pRadius * BAROMETER_TREND_FONT_PCT + GAUGE_FONT;
        pCtx.fillStyle = pColour.Trend;
        pCtx.fillText( pTrend, 0, pRadius * BAROMETER_TREND_RADIUS_PCT );
        pCtx.restore();
    }
};
/* *****************************************************************************
 Routine Name:  setBarometerValue
 
 Description:   Sets the position of the needle based on pValue as a percentage
                between the maximum and minimum values, then calls the draw 
                needle and needle edge routines.
 
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pMaxValue   : The maximum value displayed on the gauge
                pMinValue   : The minimum value displayed on the gauge
                pValue      : The value to set the needle to
       OUT:     None
 **************************************************************************** */
function setBarometerValue( pCtx, pRadius, pMaxValue, pMinValue, pValue )
{
    var Radians             = 0,
        lNeedleShadowBlur   = pRadius * NEEDLE_SHADOW_BLUR_PCT,
        lNeedleTipY_Coord   = pRadius * GAUGE_TIP_LENGTH_PCT,
        lNeedleTailY_Coord  = pRadius * GAUGE_TAIL_LENGTH_PCT;

    SetShadow({ Ctx : pCtx, ShadowBlur : lNeedleShadowBlur, ShadowColour : GAUGE_SHADOW });

    lRadians = CalculateNeedlePosition( pMaxValue, pMinValue, pValue );
    
    pCtx.save();
    pCtx.rotate( radians( lRadians ));

    pCtx.fillStyle = lgrad
                     (
                        BAROMETER_NEEDLE_START_COLOUR,
                        BAROMETER_NEEDLE_END_COLOUR,
                        lNeedleTipY_Coord - lNeedleTailY_Coord,
                        pCtx
                     );

    drawBarometerNeedle( pCtx, pRadius );
    pCtx.restore();
    
};/* *****************************************************************************
 Routine Name:  drawBarometerNeedle
 
 Description:   Draws the Needle on the Gauge.
                0,0 is the center of the gauge and the needle is drwan vertically
                with the tip pointing down starting at the bottom left point.
 
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
       OUT:     None
 **************************************************************************** */
function drawBarometerNeedle( pCtx, pRadius )
{
    var lNeedleTipY_Coord       = pRadius * GAUGE_TIP_LENGTH_PCT,
        lNeedleTailWidth        = pRadius * BAROMETER_NEEDLE_TAIL_WIDTH_PCT,
        lNeedleTipWidth         = pRadius * BAROMETER_NEEDLE_TIP_WIDTH_PCT,
        lArrowTipY_Coord        = pRadius * NEEDLE_ARROW_TIP_Y_COORD_PCT,
        lArrowTailY_Coord       = pRadius * NEEDLE_ARROW_TAIL_Y_COORD_PCT
        lArrowWidthX_Coord      = pRadius * NEEDLE_ARROW_WIDTH_X_COORD_PCT,
        lArrowWidthY_Coord      = pRadius * NEEDLE_ARROW_WIDTH_Y_COORD_PCT,
        lTailOuterY_Coord       = pRadius * NEEDLE_TAIL_OUTER_Y_COORD_PCT,
        lTailInnerY_Coord       = pRadius * NEEDLE_TAIL_INNER_Y_COORD_PCT,
        lTailOuterCircleRadius  = pRadius * NEEDLE_TAIL_OUTER_RADIUS_PCT,
        lTailInnerCircleRadius  = pRadius * NEEDLE_TAIL_INNER_RADIUS_PCT,
        lTailOuterArcRadians    = 0.1874 * Math.PI,
        lTailInnerArcRadians    = 0.0212 * Math.PI
    ;
    var lTailStartX_Coord       = Math.atan( lNeedleTailWidth / lTailOuterCircleRadius );
    
    pCtx.beginPath();
    pCtx.moveTo(            -lNeedleTipWidth,   lNeedleTipY_Coord   );
    pCtx.lineTo(            -lNeedleTipWidth,   lArrowTipY_Coord    );
    pCtx.quadraticCurveTo(  -lNeedleTipWidth,   lArrowTailY_Coord, -lArrowWidthX_Coord, lArrowWidthY_Coord );
    pCtx.lineTo(            -lNeedleTipWidth,   lArrowTailY_Coord   );
    pCtx.lineTo(            -lNeedleTailWidth, -lArrowTailY_Coord   );

    pCtx.arc( CENTRE_X_COORD, -lTailOuterY_Coord, lTailOuterCircleRadius, NINETY_DEGREES_RADIAN + lTailStartX_Coord,        ONE_EIGHTY_DEGRESS_RADIAN + lTailOuterArcRadians, false );
    pCtx.arc( CENTRE_X_COORD, -lTailInnerY_Coord, lTailInnerCircleRadius, ONE_EIGHTY_DEGRESS_RADIAN + lTailInnerArcRadians, lTailInnerArcRadians,                             true  );
    pCtx.arc( CENTRE_X_COORD, -lTailOuterY_Coord, lTailOuterCircleRadius, ZERO_DEGREES_RADIAN - lTailOuterArcRadians,       NINETY_DEGREES_RADIAN - lTailStartX_Coord,        false );

    pCtx.lineTo(            lNeedleTipWidth,    lArrowTailY_Coord   );
    pCtx.lineTo(            lArrowWidthX_Coord, lArrowWidthY_Coord  );
    pCtx.quadraticCurveTo(  lNeedleTipWidth,    lArrowTailY_Coord,  lNeedleTipWidth, lArrowTipY_Coord );
    pCtx.lineTo(            lNeedleTipWidth,    lNeedleTipY_Coord   );
    pCtx.closePath();

    pCtx.fillStyle = lgrad
                     (
                        BAROMETER_NEEDLE_END_COLOUR,
                        BAROMETER_NEEDLE_START_COLOUR,
                        lNeedleTipY_Coord - lArrowTailY_Coord,
                        pCtx
                     );
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  WriteRadialHeadings

 Description:   This routine draws the text around the inside of the scale within
                the gauge.
                It works out the width of the word and subtracts half of that from
                the start position and then writes the letters, one at a time,
                around the given radius
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
       OUT:     None
 **************************************************************************** */
function WriteRadialHeadings( pCtx, pRadius )
{
    var numRadsPerLetter    = 0,
        lRadius             = pRadius * BAROMETER_TEXT_RADIUS_PCT,
        lFontSize           = pRadius * BAROMETER_HEADING_FONT_PCT,
        lStartPosition      = NINETY_DEGREES_RADIAN * ROTATE_ANTICLOCKWISE,
        lStartOffset        = 0;

    pCtx.fillStyle = BAROMETER_FONT_COLOUR;

    for( var i = 0; i < BAROMETER_HEADINGS.length; ++i )
    {
        numRadsPerLetter = calculateRadiansPerLetter( pCtx, lRadius,  BAROMETER_HEADINGS[i], lFontSize );
        lStartOffset     = lStartPosition - (((BAROMETER_HEADINGS[i].length * numRadsPerLetter) / 2) - (numRadsPerLetter / 2));
        WriteRadialTextClockwise( pCtx, lRadius, BAROMETER_HEADINGS[i], lStartOffset, numRadsPerLetter );
        lStartPosition += NINETY_DEGREES_RADIAN;
    }
}
/* *****************************************************************************
 Routine Name:  WriteRadialTextClockwise

 Description:   When writing text around the outside of the gaugue the letters
                have to be written individually with the write position being 
                moved on by the width of one letter each time.

 Arguments:
        IN:     pCtx                : The tag for the canvas
                pRadius             : The radius of the gauge
                pText               : The text string to be written
                pStartPosition      : The starting position in Radians
                pNumRadsPerLetter   : The width of each letter in Radians
       OUT:     None
 **************************************************************************** */
function WriteRadialTextClockwise( pCtx, pRadius, pText, pStartPosition, pNumRadsPerLetter )
{
    pCtx.save();

    pCtx.rotate( pStartPosition );

    for( var i=0; i < pText.length; i++ )
    {
        pCtx.fillText( pText[i], 0, -pRadius );
        pCtx.rotate( pNumRadsPerLetter );
    }
    pCtx.restore();
}
/* *****************************************************************************
 Routine Name:  WriteRadialTextAntiClockwise
 
 Description:  The same as the clockwise version of the function, except that it
                writes in an anti-clockwise direction so that the letters are not
                upside down when writting at the bottom of the gauge.
 
                This function has also been modified to re-calcuate the width of 
                the letters at write time to facilitate mixed case and variable
                width fonts.
 
 Arguments:
        IN:     pCtx                : The tag for the canvas
                pRadius             : The radius of the gauge
                pText               : The text string to be written
                pStartPosition      : The starting position in Radians
                pNumRadsPerLetter   : The width of each letter in Radians
       OUT:     None
 **************************************************************************** */
function WriteRadialTextAntiClockwise( pCtx, pRadius, pText, pStartPosition, pFontSize, pAvgRadiansPerLetter )
{
    var lRadiansPerLetter   = 0;

    pCtx.save();
    
    pCtx.rotate( pStartPosition );

    for( var i=0; i < pText.length; i++ )
    {
        lRadiansPerLetter   = calculateRadiansPerLetter( pCtx, pRadius,  pText[i], pFontSize );
        pCtx.fillText( pText[i], 0, pRadius );
        pCtx.rotate( ROTATE_ANTICLOCKWISE * Math.max( lRadiansPerLetter, pAvgRadiansPerLetter ));
    }
    pCtx.restore();
}
/* *****************************************************************************
 Routine Name:  drawBarometerNumbers

 Description:   Draws the numbers around the number scale.

 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pMajorTicks : The array containing the ticks to be drawn
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawBarometerNumbers( pCtx, pRadius, pMajorTicks, pColour )
{
    var numRadsPerLetter    = 0,
        lStartPosition      = 0,
        lTextAngle          = 0,
        lRadius             = pRadius * BAROMETER_NUMBERS_RADIUS_PCT,
        lFontSize           = pRadius * BAROMETER_NUMBERS_FONT_PCT;

    for( var i = 0; i < pMajorTicks.length; ++i )
    {
        lTextAngle          = GAUGE_SCALE_START + ( i * ( GAUGE_SCALE_LENGTH / ( pMajorTicks.length - 1 )));
        numRadsPerLetter    = calculateRadiansPerLetter( pCtx, lRadius,  pMajorTicks[i], lFontSize );
        lStartPosition      = radians( lTextAngle ) + ONE_EIGHTY_DEGRESS_RADIAN - (((pMajorTicks[i].length * numRadsPerLetter) / 2) - (numRadsPerLetter / 2));

        pCtx.font      = pRadius * BAROMETER_NUMBERS_FONT_PCT + GAUGE_FONT;
        pCtx.fillStyle = pColour.Number;

        WriteRadialTextClockwise( pCtx, lRadius, pMajorTicks[i], lStartPosition, numRadsPerLetter  );
    }
};
/* *****************************************************************************
 Routine Name:  drawBarometerUnits
 
 Description:   Draws the units that the Barometer is displaying around the
                bottom of the gauge.
 
 Arguments:
        IN:     pCtx        : The tag for the canvas
                pRadius     : The radius of the gauge
                pUnitsText  : The text to be written
                pColour     : The array containing all gauge colours
       OUT:     None
 **************************************************************************** */
function drawBarometerUnits( pCtx, pRadius, pUnitsText, pColour )
{
    var numRadsPerLetter    = 0,
        lStartPosition      = 0,
        lRadius             = pRadius * BAROMETER_UNITS_RADIUS_PCT,
        lFontSize           = pRadius * BAROMETER_UNITS_FONT_PCT;
    
    numRadsPerLetter    = calculateRadiansPerLetter( pCtx, lRadius,  pUnitsText, lFontSize );
    lStartPosition      = ((( pUnitsText.length ) * numRadsPerLetter ) / 2 );
        
    pCtx.font      = pRadius * BAROMETER_UNITS_FONT_PCT + GAUGE_FONT;
    pCtx.fillStyle = pColour.Number;
    
    WriteRadialTextAntiClockwise( pCtx, lRadius, pUnitsText, lStartPosition, lFontSize, numRadsPerLetter );
};
/* *****************************************************************************
 Routine Name:  calculateRadiansPerLetter

 Description:   When writing text around the outside of the gaugue the letters
                have to be written individually.
                This function calcuates the length in radians of each letter
                in the supplied text for the given radius.

 Arguments:
        IN:     pCtx                : The tag for the canvas
                pTextRadius         : The radius of the Text
                pText               : The text to be meassured
                pFontSize           : The size of the font that is being used
       OUT:     lRadiansPerLetter   : The average width, in radians, of the
                                      letters in the supplied string
 **************************************************************************** */
function    calculateRadiansPerLetter( pCtx, pTextRadius, pText, pFontSize )
{
    var lCircumference      = 2 * Math.PI * pTextRadius,
        lNoOfCharacters     = pText.length,
        lArc                = 0,
        lRadians            = 0,
        lRadiansPerLetter   = 0;

    pCtx.font  = pFontSize + BAROMETER_FONT;
    lArc = pCtx.measureText( pText ).width;
    lRadians = ( lArc / lCircumference ) * ( 2 * Math.PI );
    lRadiansPerLetter = lRadians / lNoOfCharacters;

    return lRadiansPerLetter;
}
/* *****************************************************************************
 Routine Name:  RGBToHex

 Description:   This routine takes the primary colours Red Blue Green and coverts
                them into the Hexadecimal representation
 Arguments:
        IN:     pRed    : The Red Colour value
                pGreen  : The Green Colour value
                pBlue   : The Blue Colour value
       OUT:     Hex     : The hexadecimal representation
 **************************************************************************** */
function RGBToHex( pRed, pGreen, pBlue )
{
    return pRed.toString( BASE_SIXTEEN ) + pGreen.toString( BASE_SIXTEEN ) + pBlue.toString( BASE_SIXTEEN );
}
/* *****************************************************************************
 Routine Name:  HexToRGB
 
 Description:   This routine takes the primary colours Red Blue Green and coverts
 them into the Hexadecimal representation
 Arguments:
 IN:     pRed    : The Red Colour value
 pBlue   : The Blue Colour value
 pGreen  : The Green Colour value
 OUT:     Hex     : The hexadecimal representation
 **************************************************************************** */
function HexToRGB( pHexValue )
{
    var lRed    = parseInt( pHexValue.substring(1,3), BASE_SIXTEEN ),
        lGreen  = parseInt( pHexValue.substring(3,5), BASE_SIXTEEN ),
        lBlue   = parseInt( pHexValue.substring(5,7), BASE_SIXTEEN );

    return { R : lRed, G : lGreen, B : lBlue }
}
/* *****************************************************************************
 Routine Name:  drawCompass
 
 Description:   This is effectively Main. this is what you call from HTML5.
 All parameters except Canvas are optional.
 All parameters are case sensitive
 
 Arguments:
 IN:     Canvas      : '[From HTML5]',
 Value       :  The current Barometric Pressure,
 Trend       : '[Free Text - displayed at the bottom of the gauge]',
 UnitsText   : '[Free Text - displayed at the bottom of the gauge]',
 Radius      :    100,
 MinValue    :    950,
 MaxValue    :   1050,
 MajorTicks  :  ['950', '960', '970', '980', '990', '1000', '1010','1020','1030','1040','1050'],
 MinorTicks  :     10,
 Colours     : { MajorTick   : 'darkgreen',
 MinorTick   : 'darkgreen',
 Plate       : 'lightyellow',
 Number      : 'darkgreen',
 Trend       : 'green',
 Units       : 'darkgreen'
 };
 OUT:     None
 **************************************************************************** */
function drawCompass( Options )
{
    var ctx,
        lOptions    = Options               ||  {},
        lCanvas     = lOptions.Canvas       ||  null,
        lRadius     = lOptions.Radius       ||  100,
        lNeedles    = lOptions.Needle       ||  {},
        lColours    = lOptions.Colours      ||  {};
    
    var lColour     = { Tick            : lColours.Tick         || DEFAULT_TICK_COLOUR,
                        Plate           : lColours.Plate        || BAROMETER_PLATE_COLOUR,
                        Number          : lColours.Number       || DEFAULT_NUMBER_COLOUR,
                        CompassPoint    : lColours.CompassPoint || DEFAULT_TITLE_COLOUR,
                        Star            : lColours.Star         || COMPASS_STAR_COLOUR
    };

    var lNeedle     = { Value       : lNeedles.Value,
                        StartColour : lNeedles.StartColour  || COMPASS_START_COLOUR,
                        EndColour   : lNeedles.EndColour    || COMPASS_END_COLOUR
                      };

    ctx = InitCanvas( lCanvas, lRadius );
    drawBarometerPlate( ctx, lRadius, lColour );
    drawCompasCircles( ctx, lRadius, lColour, GAUGE_MINOR_TICK_WIDTH_PCT, GAUGE_MINOR_TICK_LEN_PCT, COMPASS_MINOR_TICK_INCREMENT );
    drawCompasTicks( ctx, lRadius, lColour, GAUGE_MINOR_TICK_WIDTH_PCT, GAUGE_MINOR_TICK_LEN_PCT, COMPASS_MINOR_TICK_INCREMENT );
    drawCompasTicks( ctx, lRadius, lColour, GAUGE_MAJOR_TICK_WIDTH_PCT, GAUGE_MAJOR_TICK_LEN_PCT, COMPASS_MAJOR_TICK_INCREMENT );
    drawCompassNumbers( ctx, lRadius, lColour );
    drawCompasDiamonds( ctx, lRadius, lColour );
    drawCompassStar( ctx, lRadius, lColour  );
    drawCompassPoints( ctx, lRadius, lColour );

    if( lNeedle.Value != "" )
    {
        drawCompassNeedle( ctx, lRadius, lNeedle );
        drawNeedleCap( ctx, lRadius, BAROMETER_CAP_COLOUR0, BAROMETER_CAP_COLOUR1, BAROMETER_CAP_START_RADIUS  );
        
    };
};
/* *****************************************************************************
 Routine Name:  drawCompasTicks
 
 Description:   Draws the short ticks around the number scale.
 
 Arguments:
 IN:    pCtx        : The tag for the canvas
        pRadius     : The radius of the gauge
        pMajorTicks : The array containing the ticks to be drawn
        pColour     : The array containing all gauge colours
        pMinorTicks : The number of minor ticks between the major ticks
 OUT:   None
 **************************************************************************** */
function drawCompasTicks( pCtx, pRadius, pColour, pTickWidth, pTickLength, pTickIncrement )
{
    var lRadius = pRadius * COMPASS_SCALE_RADIUS_PCT;
    
    pCtx.restore();
    pCtx.lineWidth = pRadius * pTickWidth;
    pCtx.strokeStyle = pColour.Tick;
    pCtx.save();
    
    for (var i = ZERO_DEGREES; i < THREE_SIXTY_DEGREES; i = i + pTickIncrement )
    {
        pCtx.rotate( radians( i ));
        pCtx.beginPath();
        pCtx.moveTo( 0, lRadius );
        pCtx.lineTo( 0, lRadius + (pRadius * pTickLength));
        pCtx.stroke();

        pCtx.restore();
        pCtx.save();
    }
};
/* *****************************************************************************
 Routine Name:  drawCompasCircles
 
 Description:   Draws the short ticks around the number scale.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pMajorTicks : The array containing the ticks to be drawn
 pColour     : The array containing all gauge colours
 pMinorTicks : The number of minor ticks between the major ticks
 OUT:     None
 **************************************************************************** */
function drawCompasCircles( pCtx, pRadius, pColour, pTickWidth, pTickLength, pTickIncrement )
{
    var lRadius         = pRadius * (COMPASS_SCALE_RADIUS_PCT -  pTickWidth ),
        lOuterRadius    = pRadius * (COMPASS_SCALE_RADIUS_PCT +  pTickLength),
        lInnerRadius    = pRadius * (COMPASS_SCALE_RADIUS_PCT - (pTickWidth * 5));
    
    pCtx.restore();
    pCtx.lineWidth = pRadius * pTickWidth;
    pCtx.strokeStyle = pColour.Tick;
    
    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lRadius, ZERO_DEGREES_RADIAN, THREE_SIXTY_DEGREES_RADIAN );
    pCtx.stroke();
    
    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lOuterRadius, ZERO_DEGREES_RADIAN, THREE_SIXTY_DEGREES_RADIAN );
    pCtx.stroke();

    pCtx.beginPath();
    pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lInnerRadius, ZERO_DEGREES_RADIAN, THREE_SIXTY_DEGREES_RADIAN );
    pCtx.stroke();
    
    pCtx.restore();
};
/* *****************************************************************************
 Routine Name:  drawCompassNumbers
 
 Description:   Draws the numbers around the number scale.
 
 Arguments:
 IN:    pCtx        : The tag for the canvas
        pRadius     : The radius of the gauge
        pMajorTicks : The array containing the ticks to be drawn
        pColour     : The array containing all gauge colours
 OUT:   None
 **************************************************************************** */
function drawCompassNumbers( pCtx, pRadius, pColour )
{
    var numRadsPerLetter    = 0,
        lStartPosition      = 0,
        lTextAngle          = 0,
        lRadius             = pRadius * COMPASS_NUMBERS_RADIUS_PCT,
        lInnerRadius        = pRadius * COMPASS_SCALE_RADIUS_PCT,
        lFontSize           = pRadius * COMPASS_NUMBERS_FONT_PCT;
    
    pCtx.restore();
    pCtx.font      = pRadius * COMPASS_NUMBERS_FONT_PCT + GAUGE_FONT;
    pCtx.fillStyle = pColour.Number;
    pCtx.save();

    for (var i = TEN_DEGREES; i <= THREE_FIFTY_DEGREES; i = i + COMPASS_MAJOR_TICK_INCREMENT )
    {
        // Before you can perform string manipulation on a number you have to convert it to a string i.toString()
        numRadsPerLetter    = calculateRadiansPerLetter( pCtx, lRadius,  i.toString(), lFontSize );
        lStartPosition      = radians( i ) - (((i.toString().length * numRadsPerLetter) / 2) - (numRadsPerLetter / 2));
        
        WriteRadialTextClockwise( pCtx, lRadius, i.toString(), lStartPosition, numRadsPerLetter  );

        pCtx.rotate( radians( i ));
        pCtx.beginPath();
        pCtx.moveTo( CENTRE_X_COORD, lInnerRadius );
        pCtx.lineTo( CENTRE_X_COORD, lInnerRadius + (pRadius * COMPASS_NUMBER_TICK_LEN_PCT));
        pCtx.stroke();
        
        pCtx.restore();
        pCtx.save();
    }
    pCtx.restore();
};
/* *****************************************************************************
 Routine Name:  drawMinorTicks
 
 Description:   Draws the short ticks around the number scale.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pMajorTicks : The array containing the ticks to be drawn
 pColour     : The array containing all gauge colours
 pMinorTicks : The number of minor ticks between the major ticks
 OUT:     None
 **************************************************************************** */
function drawCompasDiamonds( pCtx, pRadius, pColour )
{
    var lRadius = pRadius * COMPASS_DIAMOND_RADIUS_PCT;
    
    pCtx.restore();
    pCtx.font      = pRadius * COMPASS_NUMBERS_FONT_PCT + GAUGE_FONT;
    pCtx.fillStyle = pColour.Number;
    pCtx.save();
    
    for (var i = ZERO_DEGREES; i < THREE_SIXTY_DEGREES; i = i + COMPASS_MAJOR_TICK_INCREMENT )
    {
        pCtx.rotate( radians( i ));
        pCtx.fillText( "✦", CENTRE_X_COORD, lRadius);
        pCtx.restore();
        pCtx.save();
    }
    pCtx.font      = pRadius * COMPASS_NORTH_FONT_PCT + GAUGE_FONT;
    pCtx.fillStyle = COMPASS_NORTH_COLOUR;
    pCtx.rotate( ONE_EIGHTY_DEGRESS_RADIAN );
    pCtx.fillText( "✦", CENTRE_X_COORD, pRadius * COMPASS_DIAMOND_N_RADIUS_PCT);
    pCtx.restore();
};
/* *****************************************************************************
 Routine Name:  drawCompassStar
 
 Description:   Draws the Needle on the Gauge.
 0,0 is the center of the gauge and the needle is drwan vertically
 with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassStar( pCtx, pRadius, pColour )
{
    pCtx.restore();
    pCtx.save();

    for (var i = FORTY_FIVE_DEGREES; i < THREE_SIXTY_DEGREES; i = i + COMPASS_STAR_INCREMENT )
    {
        pCtx.rotate( radians( i ));
        drawCompassStarPoint(  pCtx, pRadius, pColour, SEVENTY_FIVE_PERCENT );
        drawCompassStarShadow( pCtx, pRadius,          SEVENTY_FIVE_PERCENT );
        pCtx.restore();
        pCtx.save();
    };
    for (var i = ZERO_DEGREES; i < THREE_SIXTY_DEGREES; i = i + COMPASS_STAR_INCREMENT )
    {
        pCtx.rotate( radians( i ));
        drawCompassStarPoint( pCtx, pRadius, pColour, ONE_HUNDRED_PERCENT );
        pCtx.restore();
        pCtx.save();
    };
    for (var i = ZERO_DEGREES; i < THREE_SIXTY_DEGREES; i = i + COMPASS_STAR_INCREMENT )
    {
        pCtx.rotate( radians( i ));
        drawCompassStarShadow( pCtx, pRadius, ONE_HUNDRED_PERCENT );
        pCtx.restore();
        pCtx.save();
    };
};
/* *****************************************************************************
 Routine Name:  drawCompassStarPoint
 
 Description:   Draws the Needle on the Gauge.
                0,0 is the center of the gauge and the needle is drwan vertically
                with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassStarPoint( pCtx, pRadius, pColour, pBaseSize )
{
    var lNeedleTipY_Coord       = pRadius * COMPASS_STAR_TIP_LENGTH_PCT * pBaseSize,
        lNeedleTailX_Coord      = pRadius * COMPASS_TAIL_WIDTH_PCT      * pBaseSize;

    pCtx.fillStyle = pColour.Star;
    pCtx.beginPath();

    pCtx.moveTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    pCtx.lineTo( -lNeedleTailX_Coord,   CENTRE_Y_COORD );
    pCtx.lineTo(  lNeedleTailX_Coord,   CENTRE_Y_COORD );
    pCtx.lineTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );

    pCtx.closePath();
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawCompassStarShadow
 
 Description:   Draws the Needle on the Gauge.
 0,0 is the center of the gauge and the needle is drwan vertically
 with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassStarShadow( pCtx, pRadius, pBaseSize )
{
    var lNeedleTipY_Coord       = pRadius * COMPASS_STAR_TIP_LENGTH_PCT     * pBaseSize,
        lNeedleShadowY_Coord    = pRadius * COMPASS_MIDDLE_SHADDOW_Y_PCT    * pBaseSize,
        lNeedleShadowX_Coord    = pRadius * COMPASS_MIDDLE_SHADDOW_X_PCT    * pBaseSize;
    
    pCtx.fillStyle = GAUGE_SHADOW;
    pCtx.beginPath();

    pCtx.moveTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    pCtx.lineTo(  CENTRE_X_COORD,       CENTRE_Y_COORD );
    pCtx.lineTo(  lNeedleShadowX_Coord, lNeedleShadowY_Coord );
    pCtx.lineTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );

    pCtx.closePath();
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawCompassPoints
 
 Description:   Draws the Needle on the Gauge.
 0,0 is the center of the gauge and the needle is drwan vertically
 with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassPoints( pCtx, pRadius, pColour )
{
    var lMajorRadius            = pRadius * COMPASS_MAJOR_POINTS_RADIUS_PCT,
        lMinorRadius            = pRadius * COMPASS_MINOR_POINTS_RADIUS_PCT,
        lAlignMajorTextMiddle   = pRadius * COMPASS_MAJOR_POINT_FONT_PCT * FORTY_PERCENT,
        lAlignMinorTextMiddle   = pRadius * COMPASS_MINOR_POINT_FONT_PCT * FORTY_PERCENT;

    pCtx.restore();
    pCtx.fillStyle = pColour.CompassPoints;
    pCtx.save();

    for( var i = 0; i < COMPASS_MAJOR_POINTS.length; ++i )
    {
        pCtx.font   = pRadius * COMPASS_MAJOR_POINT_FONT_PCT + COMPASS_POINTS_FONT;
        p           = rpoint( lMajorRadius, radians(i * NINETY_DEGREES));
        pCtx.fillText( COMPASS_MAJOR_POINTS[i], p.x, p.y + lAlignMajorTextMiddle );
        
        pCtx.font   = pRadius * COMPASS_MINOR_POINT_FONT_PCT + COMPASS_POINTS_FONT;
        p           = rpoint( lMinorRadius, radians(i * NINETY_DEGREES) + FORTY_FIVE_DEGREES_RADIAN );
        pCtx.fillText( COMPASS_MINOR_POINTS[i], p.x, p.y + lAlignMinorTextMiddle );
    };
};
/* *****************************************************************************
 Routine Name:  drawCompassStarPoint
 
 Description:   Draws the Needle on the Gauge.
 0,0 is the center of the gauge and the needle is drwan vertically
 with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassNeedle( pCtx, pRadius, pNeedle )
{
    pCtx.restore();
    pCtx.save();

//  Because 0 degress is at the bottom
    pCtx.rotate( radians( ONE_EIGHTY_DEGRESS ));
    pCtx.rotate( radians( pNeedle.Value ));
    drawCompassNeedleHalf( pCtx, pRadius, pNeedle.StartColour );
    pCtx.rotate( radians( ONE_EIGHTY_DEGRESS ));
    drawCompassNeedleHalf( pCtx, pRadius, pNeedle.EndColour );

    pCtx.restore();
    pCtx.save();
};
/* *****************************************************************************
 Routine Name:  drawCompassStarPoint
 
 Description:   Draws the Needle on the Gauge.
 0,0 is the center of the gauge and the needle is drwan vertically
 with the tip pointing down.
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 pColour     : The array containing all gauge colours
 OUT:     None
 **************************************************************************** */
function drawCompassNeedleHalf( pCtx, pRadius, pColour )
{
    var lNeedleTipY_Coord       = pRadius * COMPASS_TIP_LENGTH_PCT,
        lNeedleTailX_Coord      = pRadius * COMPASS_TAIL_WIDTH_PCT;
    
    pCtx.fillStyle = pColour;
    pCtx.beginPath();
    
    pCtx.moveTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    pCtx.lineTo( -lNeedleTailX_Coord,   CENTRE_Y_COORD );
    pCtx.lineTo(  lNeedleTailX_Coord,   CENTRE_Y_COORD );
    pCtx.lineTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    
    pCtx.closePath();
    pCtx.fill();
    
    pCtx.fillStyle = GAUGE_SHADOW;
    pCtx.beginPath();
    
    pCtx.moveTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    pCtx.lineTo(  CENTRE_X_COORD,       CENTRE_Y_COORD );
    pCtx.lineTo(  lNeedleTailX_Coord,   CENTRE_Y_COORD );
    pCtx.lineTo(  CENTRE_X_COORD,       lNeedleTipY_Coord );
    
    pCtx.closePath();
    pCtx.fill();
};
/* *****************************************************************************
 Routine Name:  drawNeedleCap
 
 Description:   Draws the 3D Cap and shadow for the needle
 
 Arguments:
 IN:     pCtx        : The tag for the canvas
 pRadius     : The radius of the gauge
 OUT:     None
 **************************************************************************** */
function drawNeedleCap( pCtx, pRadius, pBevel0Colours, pBevel1Colours, pBevelRadius )
{
    var lGaugeRadius    = 0,
        StartPoint      = 0,
        EndPoint        = THREE_SIXTY_DEGREES_RADIAN,
        lBevelRadius    = pBevelRadius,
        Blurr0          = pRadius * GAUGE_SHADOW_BLUR_PCT;
    
    pCtx.restore();
    
    SetShadow({ Ctx : pCtx, ShadowBlur : Blurr0, ShadowColour : GAUGE_SHADOW });
    
    for( var i = 0; i < pBevel0Colours.length; i++ )
    {
        pCtx.beginPath();
        lGaugeRadius = ( pRadius  * ( lBevelRadius-- / CONVERT_TO_PCT ));
        pCtx.arc( CENTRE_X_COORD, CENTRE_Y_COORD, lGaugeRadius, StartPoint, EndPoint, true );
        pCtx.fillStyle = lgrad( pBevel0Colours[i], pBevel1Colours[i], lGaugeRadius, pCtx );
        pCtx.fill();
        
        if( 0 == i )
        {
            SetShadow({ Ctx : pCtx, ShadowColour : CLEAR_SHADOW });
        }
    }
};
