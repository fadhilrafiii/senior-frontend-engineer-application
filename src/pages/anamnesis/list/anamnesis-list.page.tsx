import { ChangeEvent, useMemo, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Link, useSearchParams } from 'react-router-dom';

import IconButton from '@components/common/button/icon-button.component';
import TextField from '@components/common/input/text-field.component';
import ConfirmationModal from '@components/common/modal/confirmation-modal.component';
import Table from '@components/common/table/table.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import EyeOutlineIcon from '@components/icons/eye-outlined.icon';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import SearchOutlinedIcon from '@components/icons/search-outlined.icon';
import TrashOutlinedIcon from '@components/icons/trash-filled.icon';
import useDebounce from '@libs/hooks/use-debounce.hook';
import useLocalStorage from '@libs/hooks/use-local-storage.hook';
import { IAnamnesisForm } from '@libs/types/anamnesis.type';

import { ANAMNESIS_STORAGE_KEY } from '@constants/key.constant';

const AnamnesisListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search');
  const [searchText, setSearchText] = useState(initialSearch || '');

  const [anamnesisForms, setAnamnesisForms] = useLocalStorage<IAnamnesisForm[]>(
    ANAMNESIS_STORAGE_KEY,
    [],
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    searchParams.set('search', e.target.value);
    setSearchParams(searchParams);
  };

  const debouncedSearchText = useDebounce(searchText);
  const searchedData = useMemo(
    () =>
      anamnesisForms.filter(
        (anamnesisForm: IAnamnesisForm) =>
          new RegExp(debouncedSearchText, 'gi').test(anamnesisForm.title) ||
          new RegExp(debouncedSearchText, 'gi').test(anamnesisForm.description),
      ),
    [anamnesisForms, debouncedSearchText],
  );

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const actionClickDelete = (anamnesisFormId: string) => {
    setDeleteId(anamnesisFormId);
  };
  const handleConfirmDelete = () => {
    setAnamnesisForms(anamnesisForms.filter((form: IAnamnesisForm) => form.id !== deleteId));
    setDeleteId(null);
  };

  const columns = useMemo(
    () =>
      [
        {
          header: 'Title',
          accessorKey: 'title',
        },
        {
          header: 'Description',
          accessorKey: 'description',
        },
        {
          header: 'Created At',
          accessorKey: 'createdAt',
        },
        {
          header: 'Action',
          cell: ({ row }) => {
            return (
              <div className="flex items-center justify-center gap-2">
                <Link to={row.original.id}>
                  <IconButton Icon={EyeOutlineIcon} theme={IconButton.Theme.Secondary} />
                </Link>
                <Link to={`${row.original.id}/edit`}>
                  <IconButton Icon={EditFilledIcon} theme={IconButton.Theme.Secondary} />
                </Link>
                <IconButton
                  Icon={TrashOutlinedIcon}
                  theme={IconButton.Theme.Secondary}
                  iconClassName="fill-red-700"
                  onClick={() => actionClickDelete(row.original.id)}
                />
              </div>
            );
          },
        },
      ] as ColumnDef<IAnamnesisForm>[],
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <TextField
          placeholder="Search by title or description..."
          className="basis-[320px]"
          onChange={onSearch}
          EndIcon={SearchOutlinedIcon}
        />
        <Link
          data-testid="create-anamnesis-button"
          to="/anamnesis/create"
          className="flex bg-primary items-center gap-2 h-10 rounded-md px-3 text-white text-sm"
        >
          <PlusFilledIcon size={20} />
          Create
        </Link>
      </div>
      <Table<IAnamnesisForm> data={searchedData} columns={columns} />
      {/* Delete confirmation Modal */}
      <ConfirmationModal
        open={!!deleteId}
        danger
        title="Delete Anamnesis Form"
        description={`Are you sure to delete anamnesis form ${deleteId} ?`}
        confirmText="Yes, Delete"
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AnamnesisListPage;
