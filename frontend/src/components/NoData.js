import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

export default function NoData() {
    return (
        <ReactLoading type="bars" color={"black"} height={667} width={375} />
    )
}