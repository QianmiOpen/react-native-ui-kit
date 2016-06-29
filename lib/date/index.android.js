import React from 'react';
import  {
    NativeModules
} from 'react-native';

const { DatePickerModule } = NativeModules;

/**
 * 显示DatePickerDialog
 *
 * month: 0-11
 */
const show = (params:Object = {}) => {
    params || (params = {});
    //如果没有设置时间，默认当前的时间
    var date = new Date();
    var year = params.year - 0 || date.getFullYear();
    var month = params.month - 0 || date.getMonth();
    var day = params.day - 0 || date.getDate();
    //设置最大时间
    var maxDateInMillon = (params.maxDateInMillon || 0) + '';
    //设置最小时间
    var minDateInMillon = (params.minDateInMillon || 0) + '';
    //确定的回调
    var onOk = params.onOk;

    //onOK传递的参数
    //year	The year that was set.
    //monthOfYear	The month that was set (0-11) for compatibility with Calendar.
    //dayOfMonth	The day of the month that was set.
    DatePickerModule.show(year, month, day, maxDateInMillon, minDateInMillon, onOk);
};

export default {
    show
};