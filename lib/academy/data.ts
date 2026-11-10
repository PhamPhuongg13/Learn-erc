import curriculum from '../../data/curriculum.json';
import bank from '../../data/question_bank.json';
import type {Lesson,Question} from './types';
export const lessons=curriculum as Lesson[];
export const questions=bank as Question[];
export const stages=[{title:'ERP nền tảng',subtitle:'Hiểu bức tranh lớn',color:'indigo',range:'L01 – L03',description:'Từ dữ liệu rời rạc đến một hệ thống kết nối.'},{title:'Quy trình nghiệp vụ',subtitle:'Theo dấu một giao dịch',color:'amber',range:'L04 – L06',description:'Bán hàng, mua hàng và quản lý tồn kho.'},{title:'Nền tảng 1C',subtitle:'Biến nghiệp vụ thành ứng dụng',color:'green',range:'L07 – L12',description:'Catalog, Document, Register và Report.'},{title:'Tổng ôn & thi thử',subtitle:'Kết nối những điều đã học',color:'rose',range:'L13 · R01 · R02',description:'Ôn lỗi, hệ thống kiến thức và luyện đề.'}];
export const glossary=[
['ERP','Hoạch định nguồn lực doanh nghiệp','Tích hợp quy trình và dữ liệu giữa các bộ phận.','ERP tập trung hoạt động toàn doanh nghiệp; CRM tập trung quan hệ khách hàng.'],
['CRM','Quản lý quan hệ khách hàng','Theo dõi khách hàng, tương tác và cơ hội bán hàng.','Có thể tích hợp với ERP, không đồng nghĩa ERP.'],
['SCM','Quản lý chuỗi cung ứng','Phối hợp dòng hàng và thông tin từ nhà cung cấp tới khách.','ERP và SCM có thể chồng lấn chức năng.'],
['Master data','Dữ liệu danh mục','Thực thể dùng lại: sản phẩm, khách hàng, nhà cung cấp.','Danh mục KB-01 khác đơn bán SO-001.'],
['Transaction data','Dữ liệu giao dịch','Sự kiện nghiệp vụ có thời điểm, số lượng, trạng thái.','Giao dịch tham chiếu master data.'],
['Sales Order','Đơn bán hàng','Ghi nhận yêu cầu hoặc cam kết đơn bán.','Đơn bán chưa chứng minh đã giao hàng hay thu tiền.'],
['Invoice','Hóa đơn','Ghi nhận yêu cầu thanh toán, giá trị bán/mua theo quy trình.','Hóa đơn chưa đồng nghĩa Payment.'],
['Payment','Thanh toán','Sự kiện chi hoặc thu tiền.','Khách có hóa đơn 800.000đ nhưng chưa trả thì chưa thu tiền.'],
['PR','Yêu cầu mua','Đề xuất nhu cầu mua nội bộ.','PR khác PO được gửi nhà cung cấp.'],
['PO','Đơn mua hàng','Đơn đặt hàng gửi nhà cung cấp.','PO không chứng minh hàng đã nhập kho.'],
['Goods Receipt','Phiếu nhận hàng','Ghi nhận hàng thực nhận.','Đối chiếu PO + Goods Receipt + Invoice.'],
['Stock quantity','Số lượng tồn','Số đơn vị hàng theo mặt hàng, kho và thời điểm.','Giá trị tồn cần giá vốn/phương pháp định giá, không phải giá bán.'],
['Platform','Nền tảng','Công cụ và môi trường chạy ứng dụng 1C.','Configuration là thiết kế ứng dụng cụ thể.'],
['Configuration','Cấu hình ứng dụng','Định nghĩa cấu trúc và logic của ứng dụng nghiệp vụ.','Một platform có thể dùng cho nhiều configuration.'],
['Designer','Chế độ thiết kế','Dùng xây metadata, form và logic.','Enterprise mode để người dùng chạy nghiệp vụ.'],
['Enterprise mode','Chế độ sử dụng','Chạy ứng dụng và thao tác dữ liệu.','Tạo một sản phẩm là thao tác dữ liệu; thêm trường là thiết kế.'],
['Infobase','Cơ sở thông tin','Chứa cấu hình và dữ liệu của ứng dụng.','Không chỉ là một Catalog hay một bảng SQL.'],
['Catalog','Danh mục','Lưu thực thể tham chiếu như Products, Customers.','Document ghi nhận sự kiện như nhập kho.'],
['Document','Chứng từ','Sự kiện nghiệp vụ có số, ngày và các dòng chi tiết.','Saved/Draft khác Posted.'],
['Posting','Ghi sổ','Ghi nhận tác động của chứng từ theo logic cấu hình.','Lưu nháp chưa tạo biến động kho trong sandbox.'],
['Accumulation Register','Thanh ghi tích lũy','Lưu biến động số liệu để tính số dư hoặc phát sinh.','Information Register phù hợp bảng giá theo ngày.'],
['Information Register','Thanh ghi thông tin','Lưu thông tin theo chiều, có thể theo thời gian.','Không phải cơ chế cộng trừ tồn thay Accumulation Register.'],
['Dimension','Chiều dữ liệu','Xác định nhóm như Product và Warehouse.','Resource là Quantity được tích lũy theo các chiều.'],
['Resource','Số liệu tích lũy','Giá trị số như Quantity trong register tồn.','Warehouse là dimension, không phải quantity.'],
['Recorder','Chứng từ nguồn','Truy vết chứng từ tạo movement.','Giúp tìm phiếu nào đã thay đổi tồn.'],
['Query','Truy vấn','Yêu cầu lấy và tổng hợp dữ liệu.','Report trình bày kết quả; Register lưu dữ liệu.'],
['Report','Báo cáo','Trình bày số liệu để ra quyết định.','Xem báo cáo không tự sinh movement.'],
['Role','Vai trò phân quyền','Quy định người dùng được xem và thao tác gì.','Form là giao diện; ẩn nút không thay kiểm tra quyền.']];
