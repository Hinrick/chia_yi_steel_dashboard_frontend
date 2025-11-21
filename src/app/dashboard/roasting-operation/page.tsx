'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  BoltOutlined as QuickAddIcon,
} from '@mui/icons-material';
import { DissolveRecord, DissolveFormData, FURNACE_OPTIONS, MATERIAL_OPTIONS } from '@/types/dissolve';

// Sample data matching the production page
const sampleData: DissolveRecord[] = [
  {
    id: 'LA-20250115-001',
    date: new Date('2025-10-20'),
    recorder: 'admin',
    furnaceNo: 'LA',
    cumulativeBatches: 37,
    dailyBatch: 1,
    material: 'FCD550',
    residualSoup: 0,
    pigIron: 0,
    scrapIron: 0,
    returnMaterial: 0,
    carbonizer: 0,
    nucleatingAgent: 0,
    ferrosilicon: 0,
    sic: 0,
    manganeseFe: 0,
    sulfurFe: 0,
    copper: 0,
    tinFe: 0,
    molybdenumFe: '',
    nickelFe: 0,
    abnormalQitPigIron: '',
    abnormalScrapIron: 0,
    powerOnTime: '08:50',
    powerOffTime: '10:16',
    primaryCrystalTemp: 0,
    eutecticTemp: 0,
    beakerUsage: 0,
    ce: 0,
    carbonPercent: 0,
    siliconPercent: 0,
    outputTemperature: 1563,
    createdAt: new Date('2025-10-20T08:50:00'),
    updatedAt: new Date('2025-10-20T10:16:00'),
  },
  {
    id: 'LA-20250116-002',
    date: new Date('2025-10-20'),
    recorder: 'admin',
    furnaceNo: 'LA',
    cumulativeBatches: 38,
    dailyBatch: 2,
    material: 'FCD600',
    residualSoup: 0,
    pigIron: 0,
    scrapIron: 0,
    returnMaterial: 0,
    carbonizer: 0,
    nucleatingAgent: 0,
    ferrosilicon: 0,
    sic: 0,
    manganeseFe: 0,
    sulfurFe: 0,
    copper: 0,
    tinFe: 0,
    molybdenumFe: '',
    nickelFe: 0,
    abnormalQitPigIron: '',
    abnormalScrapIron: 0,
    powerOnTime: '09:15',
    powerOffTime: '11:30',
    primaryCrystalTemp: 0,
    eutecticTemp: 0,
    beakerUsage: 0,
    ce: 0,
    carbonPercent: 0,
    siliconPercent: 0,
    outputTemperature: 1580,
    createdAt: new Date('2025-10-20T09:15:00'),
    updatedAt: new Date('2025-10-20T11:30:00'),
  },
];

const initialFormData: DissolveFormData = {
  date: new Date(),
  recorder: 'admin',
  furnaceNo: 'LA',
  material: 'FCD550',
  residualSoup: 0,
  pigIron: 0,
  scrapIron: 0,
  returnMaterial: 0,
  carbonizer: 0,
  nucleatingAgent: 0,
  ferrosilicon: 0,
  sic: 0,
  manganeseFe: 0,
  sulfurFe: 0,
  copper: 0,
  tinFe: 0,
  molybdenumFe: '',
  nickelFe: 0,
  abnormalQitPigIron: '',
  abnormalScrapIron: 0,
  powerOnTime: '',
  powerOffTime: '',
  primaryCrystalTemp: 0,
  eutecticTemp: 0,
  beakerUsage: 0,
  ce: 0,
  carbonPercent: 0,
  siliconPercent: 0,
  outputTemperature: 1500,
};

export default function Page() {
  const [records, setRecords] = useState<DissolveRecord[]>(sampleData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openQuickAdd, setOpenQuickAdd] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DissolveRecord | null>(null);
  const [formData, setFormData] = useState<DissolveFormData>(initialFormData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleOpenDialog = (record?: DissolveRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        date: record.date,
        recorder: record.recorder,
        furnaceNo: record.furnaceNo,
        material: record.material,
        powerOnTime: record.powerOnTime,
        powerOffTime: record.powerOffTime,
        outputTemperature: record.outputTemperature,
      });
    } else {
      setEditingRecord(null);
      setFormData(initialFormData);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecord(null);
    setFormData(initialFormData);
  };

  const handleSave = () => {
    if (editingRecord) {
      // Update existing record
      setRecords(records.map(r =>
        r.id === editingRecord.id
          ? { ...r, ...formData, updatedAt: new Date() }
          : r
      ));
    } else {
      // Create new record
      const newRecord: DissolveRecord = {
        id: `${formData.furnaceNo}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(records.length + 1).padStart(3, '0')}`,
        ...formData,
        cumulativeBatches: Math.max(...records.map(r => r.cumulativeBatches), 0) + 1,
        dailyBatch: records.filter(r =>
          r.date.toDateString() === formData.date.toDateString()
        ).length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRecords([...records, newRecord]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      setRecords(records.filter(r => r.id !== recordToDelete));
      setRecordToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          烘解作業
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ borderRadius: 1 }}
          >
            篩選
          </Button>
          <Button
            variant="contained"
            startIcon={<QuickAddIcon />}
            onClick={() => setOpenQuickAdd(true)}
            sx={{
              borderRadius: 1,
              bgcolor: 'info.main',
              '&:hover': { bgcolor: 'info.dark' },
            }}
          >
            快速新增
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 1,
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            新增
          </Button>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>操作</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>日期</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>記錄人</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>爐號</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>累計爐次(自動累計)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>日爐次</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>材質</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>送電</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>關電</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>出爐溫度°C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                sx={{
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.50',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(record)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(record.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>{record.id}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>{record.recorder}</TableCell>
                <TableCell>{record.furnaceNo}</TableCell>
                <TableCell>{record.cumulativeBatches}</TableCell>
                <TableCell>{record.dailyBatch}</TableCell>
                <TableCell>{record.material}</TableCell>
                <TableCell>{record.powerOnTime}</TableCell>
                <TableCell>{record.powerOffTime}</TableCell>
                <TableCell>{record.outputTemperature}°C</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Info */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="text.secondary">
          共 {records.length} 筆
        </Typography>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editingRecord ? '編輯烘解記錄' : '新增烘解記錄'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Basic Info Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="日期"
                type="date"
                value={formData.date.toISOString().slice(0, 10)}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="記錄人"
                value={formData.recorder}
                onChange={(e) => setFormData({ ...formData, recorder: e.target.value })}
                fullWidth
              />
            </Box>

            {/* Furnace Info Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
              <TextField
                label="爐號"
                select
                value={formData.furnaceNo}
                onChange={(e) => setFormData({ ...formData, furnaceNo: e.target.value })}
                fullWidth
              >
                {FURNACE_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="累計爐次(自動累計)"
                type="number"
                disabled
                value={editingRecord?.cumulativeBatches || 0}
                fullWidth
              />
              <TextField
                label="日爐次"
                type="number"
                disabled
                value={editingRecord?.dailyBatch || 0}
                fullWidth
              />
            </Box>

            {/* Material Row */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="材質"
                select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                fullWidth
              >
                {MATERIAL_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Raw Materials Section */}
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>原料</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="殘湯"
                type="number"
                value={formData.residualSoup}
                onChange={(e) => setFormData({ ...formData, residualSoup: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="銑鐵"
                type="number"
                value={formData.pigIron}
                onChange={(e) => setFormData({ ...formData, pigIron: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="廢鐵"
                type="number"
                value={formData.scrapIron}
                onChange={(e) => setFormData({ ...formData, scrapIron: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="回爐料"
                type="number"
                value={formData.returnMaterial}
                onChange={(e) => setFormData({ ...formData, returnMaterial: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="加碳劑"
                type="number"
                value={formData.carbonizer}
                onChange={(e) => setFormData({ ...formData, carbonizer: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="增碳成核劑"
                type="number"
                value={formData.nucleatingAgent}
                onChange={(e) => setFormData({ ...formData, nucleatingAgent: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="矽鐵"
                type="number"
                value={formData.ferrosilicon}
                onChange={(e) => setFormData({ ...formData, ferrosilicon: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="SIC"
                type="number"
                value={formData.sic}
                onChange={(e) => setFormData({ ...formData, sic: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="錳(Mn)鐵"
                type="number"
                value={formData.manganeseFe}
                onChange={(e) => setFormData({ ...formData, manganeseFe: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="硫(S)鐵"
                type="number"
                value={formData.sulfurFe}
                onChange={(e) => setFormData({ ...formData, sulfurFe: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="銅(Cu)"
                type="number"
                value={formData.copper}
                onChange={(e) => setFormData({ ...formData, copper: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="錫(Sn)鐵"
                type="number"
                value={formData.tinFe}
                onChange={(e) => setFormData({ ...formData, tinFe: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="鉬(Mo)鐵"
                value={formData.molybdenumFe}
                onChange={(e) => setFormData({ ...formData, molybdenumFe: e.target.value })}
                fullWidth
              />
              <TextField
                label="鎳(Ni)鐵"
                type="number"
                value={formData.nickelFe}
                onChange={(e) => setFormData({ ...formData, nickelFe: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="異常添加 QIT 銑鐵"
                value={formData.abnormalQitPigIron}
                onChange={(e) => setFormData({ ...formData, abnormalQitPigIron: e.target.value })}
                fullWidth
              />
              <TextField
                label="異常添加廢鐵"
                type="number"
                value={formData.abnormalScrapIron}
                onChange={(e) => setFormData({ ...formData, abnormalScrapIron: Number(e.target.value) })}
                fullWidth
              />
            </Box>

            {/* Process Parameters Section */}
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>製程參數</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
              <TextField
                label="送電"
                type="time"
                value={formData.powerOnTime}
                onChange={(e) => setFormData({ ...formData, powerOnTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="關電"
                type="time"
                value={formData.powerOffTime}
                onChange={(e) => setFormData({ ...formData, powerOffTime: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="初晶溫度"
                type="number"
                value={formData.primaryCrystalTemp}
                onChange={(e) => setFormData({ ...formData, primaryCrystalTemp: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="共晶溫度"
                type="number"
                value={formData.eutecticTemp}
                onChange={(e) => setFormData({ ...formData, eutecticTemp: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="燒杯使用量"
                type="number"
                value={formData.beakerUsage}
                onChange={(e) => setFormData({ ...formData, beakerUsage: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="C.E"
                type="number"
                value={formData.ce}
                onChange={(e) => setFormData({ ...formData, ce: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.01 }}
              />
              <TextField
                label="C%"
                type="number"
                value={formData.carbonPercent}
                onChange={(e) => setFormData({ ...formData, carbonPercent: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.01 }}
              />
              <TextField
                label="Si %"
                type="number"
                value={formData.siliconPercent}
                onChange={(e) => setFormData({ ...formData, siliconPercent: Number(e.target.value) })}
                fullWidth
                inputProps={{ step: 0.01 }}
              />
              <TextField
                label="出爐溫度°C"
                type="number"
                value={formData.outputTemperature}
                onChange={(e) => setFormData({ ...formData, outputTemperature: Number(e.target.value) })}
                fullWidth
                inputProps={{ min: 1000, max: 2000 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSave} variant="contained">
            儲存
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Add Dialog */}
      <Dialog open={openQuickAdd} onClose={() => setOpenQuickAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle>快速新增烘解作業</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="爐號"
              select
              value={formData.furnaceNo}
              onChange={(e) => setFormData({ ...formData, furnaceNo: e.target.value })}
              fullWidth
            >
              {FURNACE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="材質"
              select
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              fullWidth
            >
              {MATERIAL_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="出爐溫度 (°C)"
              type="number"
              value={formData.outputTemperature}
              onChange={(e) => setFormData({ ...formData, outputTemperature: Number(e.target.value) })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQuickAdd(false)}>取消</Button>
          <Button
            onClick={() => {
              handleSave();
              setOpenQuickAdd(false);
            }}
            variant="contained"
          >
            快速新增
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>確定要刪除此筆記錄嗎？此操作無法復原。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>取消</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
