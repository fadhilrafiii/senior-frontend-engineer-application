import IconButton from '@components/common/button/icon-button.component';
import ChevronLeftOutlinedIcon from '@components/icons/chevron-left-outlined.icon';
import ChevronRightOutlinedIcon from '@components/icons/chevron-right-outlined.icon';

import SelectDropdown from '../input/select-dropdown.component';

interface IProps {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalData: number;
  canGoBack?: boolean;
  canGoNext?: boolean;
  onChangePage: (pageIndex: number) => void;
  onChangePageSize: (pageSize: number) => void;
}

const Pagination = ({
  currentPage,
  pageSize,
  totalData,
  canGoBack = true,
  canGoNext = true,
  totalPage,
  onChangePage,
  onChangePageSize,
}: IProps) => {
  return (
    <div className="flex items-center p-4 justify-between">
      <div className="flex items-center gap-2">
        <IconButton
          Icon={ChevronLeftOutlinedIcon}
          disabled={!canGoBack}
          size={16}
          theme={IconButton.Theme.Secondary}
          onClick={() => onChangePage(currentPage - 2)}
        />
        <div className="flex items-center gap-1">
          <span className="text-sm">Page</span>
          <input
            type="number"
            min="1"
            max={totalPage}
            value={currentPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              onChangePage(page);
            }}
            className="border px-2 py-1 rounded w-16 text-sm"
          />
          <span className="text-sm">of {totalPage}</span>
        </div>
        <IconButton
          Icon={ChevronRightOutlinedIcon}
          disabled={!canGoNext}
          size={16}
          theme={IconButton.Theme.Secondary}
          onClick={() => onChangePage(currentPage)}
        />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm">Showing</span>
        <SelectDropdown<number>
          className="w-16"
          position="top"
          value={pageSize}
          options={[10, 20, 30, 40, 50].map((pageSize: number) => ({
            label: pageSize.toString(),
            value: pageSize,
          }))}
          onChange={onChangePageSize}
        />

        <span className="text-sm">of {totalData} Data</span>
      </div>
    </div>
  );
};

export default Pagination;
