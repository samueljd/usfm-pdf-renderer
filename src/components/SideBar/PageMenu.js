import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const pages = [
	{ name: 'A5', value: 'A5' },
	{ name: 'A5 Landscape', value: 'A5Landscape' },
	{ name: 'A4', value: 'A4' },
	{ name: 'A4 Landscape', value: 'A4Landscape' },
	{ name: 'A3', value: 'A3' },
	{ name: 'A3 Landscape', value: 'A3Landscape' },
];

export default function PageMenu({ setPagesize }) {
	const [selected, setSelected] = useState(pages[2]);
	useEffect(() => {
		if (selected) {
			setPagesize(selected);
		}
	}, [selected]);
	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className='relative mt-1 z-10'>
				<Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
					<span className='block truncate text-center'>
						{selected.name}
					</span>
					<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
						<ChevronUpDownIcon
							className='h-5 w-5 text-gray-400'
							aria-hidden='true'
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{pages.map((page, personIdx) => (
							<Listbox.Option
								key={personIdx}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active
											? 'bg-amber-100 text-amber-900'
											: 'text-gray-900'
									}`
								}
								value={page}>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected
													? 'font-medium'
													: 'font-normal'
											}`}>
											{page.name}
										</span>
										{selected ? (
											<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
												<CheckIcon
													className='h-5 w-5'
													aria-hidden='true'
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
