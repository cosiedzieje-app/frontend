export function convertLen(lon: any, lat: any){
    let smRadius = 6378136.98;
    let smRange = smRadius * Math.PI * 2.0;
    let smLonToX = smRange / 360.0;
    let smRadiansOverDegrees = Math.PI / 180.0;

    lon *= smLonToX;

    let y = lat;


    if (y > 86.0)
    {
      lat = smRange;
    }
    else if (y < -86.0)
    {
      lat = -smRange;
    }
    else
    {
        y *= smRadiansOverDegrees;
        y = Math.log(Math.tan(y) + (1.0 / Math.cos(y)));
        lat = y * smRadius; 
    }

    return [lon, lat]
}