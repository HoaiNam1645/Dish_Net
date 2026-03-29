import StoreDashboardClient from '@/features/store-management/StoreDashboardClient';

export const metadata = {
    title: 'DishNet - Tổng quan cửa hàng',
    description: 'Tổng quan quản lý cửa hàng trên DishNet',
};

export default function StoreDashboardPage() {
    return <StoreDashboardClient />;
}
