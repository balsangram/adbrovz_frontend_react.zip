import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconEdit from '../../../components/Icon/IconEdit';
import { rejectedListingsData } from '../../../data';

const DeletedListings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Deleted Listings'));
    }, []);

    const [items, setItems] = useState(rejectedListingsData);

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
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'stateName'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
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

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return item.serialNo.toLowerCase().includes(search.toLowerCase()) || item.status.tooltip.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/promo/dashboard" className="text-primary hover:underline">
                        Promo Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>DeletedListings</span>
                </li>
            </ul>
            <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
                <div className="flex items-center justify-between ms-4 mb-3">
                    <h5 className="font-semibold text-lg dark:text-white-light">DeletedListings</h5>
                </div>
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
                                    accessor: 'advertiseID',
                                    title: 'Advertise ID',
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
                                    accessor: 'type',
                                    sortable: true,
                                },
                                {
                                    accessor: 'days',
                                    sortable: true,
                                },
                                {
                                    accessor: 'adTitle',
                                    sortable: true,
                                },
                                {
                                    accessor: 'businessName',
                                    sortable: true,
                                },
                                {
                                    accessor: 'businessContact',
                                    sortable: true,
                                },
                                {
                                    accessor: 'businessMail',
                                    sortable: true,
                                },
                                {
                                    accessor: 'location',
                                    sortable: true,
                                },
                                {
                                    accessor: 'pincode',
                                    sortable: true,
                                },
                                {
                                    accessor: 'requestedBy',
                                    sortable: true,
                                },
                                {
                                    accessor: 'requestedOn',
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
        </>
    );
};

export default DeletedListings;
