import React from 'react';
import ColumnSwitch from './ColumnSwitch';
import MarginPage from './MarginPage';
import PageStyle from './PageMenu';
export default function Sidebar({setPagesize,setSelectcolumn, setPageMargin}) {
	return (
    <div className='space-y-3'>
      <div className='flex items-center'>
        <h2 className='text-xl font-bold'>Page Setup</h2>
      </div>
      <div className='flex-1'>
        <ul className='pt-2 pb-4 space-y-1 text-sm'>
          <li className='rounded-sm'>
            <PageStyle setPagesize={setPagesize}/>
          </li>
          <li><MarginPage setPageMargin={setPageMargin} /></li>
          <li className='rounded-sm'>
            <ColumnSwitch setSelectcolumn={setSelectcolumn}/>
          </li>
        </ul>
      </div>
    </div>
	);
}
