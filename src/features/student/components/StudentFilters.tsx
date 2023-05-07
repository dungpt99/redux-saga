import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ChangeEvent, useRef } from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFiltersProps {
  cityList: City[];
  filter: ListParams;

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  cityList,
  filter,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: event.target.value || undefined,
    };

    onChange(newFilter);
  };

  const handleSortChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const value = event.target.value;
    const [_sort, _order] = (value as string)?.split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: '',
    };

    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              onChange={handleSearchChange}
              endAdornment={<Search />}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="filterByCity"
              value={filter?.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem>
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              label="sortBy"
              onChange={handleSortChange}
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
