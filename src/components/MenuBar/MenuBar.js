import { useState,useContext   } from 'react';

import { AppContext } from '../../App.context';

export default function NavBar() {
	const [navbar, setNavbar] = useState(false);
  const {
    actions: {
      setPrintPreview,
    }
  } = useContext(AppContext)
  const handlePrint = () => {
    setPrintPreview(true)
  };

	return (
		<nav className='w-full bg-blue-500 shadow'>
			<div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
				<div>
					<div className='flex items-center justify-between py-3 md:py-5 md:block'>
							<h2 className='text-2xl font-bold text-white'>
								Publisher
							</h2>
						<div className='md:hidden'>
							<button
								className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
								onClick={() => setNavbar(!navbar)}>
								{navbar ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-6 h-6 text-white'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-6 h-6 text-white'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6h16M4 12h16M4 18h16'
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<div className='hidden space-x-2 md:inline-block'>
					<button  onClick={handlePrint}
						className='px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'>
						Print Preview
					</button>
				</div>
			</div>
		</nav>
	);
}
