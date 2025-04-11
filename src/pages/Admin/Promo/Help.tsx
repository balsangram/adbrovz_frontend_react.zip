import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Link, NavLink } from 'react-router-dom';
import IconCaretDown from '../../../components/Icon/IconCaretDown';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { promoHelpsData } from '../../../data';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconEdit from '../../../components/Icon/IconEdit';

const PromoHelp = () => {
    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Promo Help'));
    }, []);

    const [items, setItems] = useState(promoHelpsData);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'serialNo'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'serialNo',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/promo/dashboard" className="text-primary hover:underline">
                        Promo Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Promo Help</span>
                </li>
            </ul>
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Promo Help</h5>
            </div>
            <div className="mb-5">
                <div className="space-y-2 font-semibold">
                    <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                        <button type="button" className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '1' ? '!text-primary' : ''}`} onClick={() => togglePara('1')}>
                            Help Info (2)
                            <div className={`ltr:ml-auto rtl:mr-auto ${active === '1' ? 'rotate-180' : ''}`}>
                                <IconCaretDown />
                            </div>
                        </button>
                        <div>
                            <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                    <div className="invoice-table">
                                        <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                                            <div className="flex items-center gap-2">
                                                <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                                    <IconTrashLines />
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="ltr:ml-auto rtl:mr-auto">
                                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="datatables pagination-padding">
                                            <DataTable
                                                className="whitespace-nowrap table-hover invoice-table"
                                                records={records}
                                                columns={[
                                                    {
                                                        accessor: 'serialNo',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'helpID',
                                                        title: 'Help ID',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'imageUrl',
                                                        title: 'Image',
                                                        sortable: true,
                                                        render: ({ imageUrl, id }) => (
                                                            <div className="flex items-center w-max">
                                                                <img className="w-10 h-10 square-full ltr:mr-2 rtl:ml-2 object-cover" src={imageUrl} alt="" />
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        accessor: 'helpTitle',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'status',
                                                        sortable: true,
                                                        render: ({ status }) => <span className={`text-${status.color} `}>{status.tooltip}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Actions',
                                                        sortable: false,
                                                        textAlignment: 'center',
                                                        render: ({ id }) => (
                                                            <div className="flex gap-4 items-center w-max mx-auto">
                                                                <NavLink to="/admin/state/edit" className="flex hover:text-info">
                                                                    <IconEdit className="w-4.5 h-4.5" />
                                                                </NavLink>
                                                                <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                                                    <IconTrashLines />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                highlightOnHover
                                                totalRecords={initialRecords.length}
                                                recordsPerPage={pageSize}
                                                page={page}
                                                onPageChange={(p) => setPage(p)}
                                                recordsPerPageOptions={PAGE_SIZES}
                                                onRecordsPerPageChange={setPageSize}
                                                sortStatus={sortStatus}
                                                onSortStatusChange={setSortStatus}
                                                selectedRecords={selectedRecords}
                                                onSelectedRecordsChange={setSelectedRecords}
                                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                    <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                        <button type="button" className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active === '2' ? '!text-primary' : ''}`} onClick={() => togglePara('2')}>
                            Deleted Help Info (2)
                            <div className={`ltr:ml-auto rtl:mr-auto ${active === '2' ? 'rotate-180' : ''}`}>
                                <IconCaretDown />
                            </div>
                        </button>
                        <div>
                            <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                    <div className="invoice-table">
                                        <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                                            <div className="flex items-center gap-2">
                                                <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                                    <IconTrashLines />
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="ltr:ml-auto rtl:mr-auto">
                                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="datatables pagination-padding">
                                            <DataTable
                                                className="whitespace-nowrap table-hover invoice-table"
                                                records={records}
                                                columns={[
                                                    {
                                                        accessor: 'serialNo',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'helpID',
                                                        title: 'Help ID',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'imageUrl',
                                                        title: 'Image',
                                                        sortable: true,
                                                        render: ({ imageUrl, id }) => (
                                                            <div className="flex items-center w-max">
                                                                <img className="w-10 h-10 square-full ltr:mr-2 rtl:ml-2 object-cover" src={imageUrl} alt="" />
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        accessor: 'helpTitle',
                                                        sortable: true,
                                                    },
                                                    {
                                                        accessor: 'status',
                                                        sortable: true,
                                                        render: ({ status }) => <span className={`text-${status.color} `}>{status.tooltip}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Actions',
                                                        sortable: false,
                                                        textAlignment: 'center',
                                                        render: ({ id }) => (
                                                            <div className="flex gap-4 items-center w-max mx-auto">
                                                                <NavLink to="/admin/state/edit" className="flex hover:text-info">
                                                                    <IconEdit className="w-4.5 h-4.5" />
                                                                </NavLink>
                                                                <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                                                    <IconTrashLines />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                highlightOnHover
                                                totalRecords={initialRecords.length}
                                                recordsPerPage={pageSize}
                                                page={page}
                                                onPageChange={(p) => setPage(p)}
                                                recordsPerPageOptions={PAGE_SIZES}
                                                onRecordsPerPageChange={setPageSize}
                                                sortStatus={sortStatus}
                                                onSortStatusChange={setSortStatus}
                                                selectedRecords={selectedRecords}
                                                onSelectedRecordsChange={setSelectedRecords}
                                                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PromoHelp;
