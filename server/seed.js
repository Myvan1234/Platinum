import { content } from './data.js';

const source = 'Hồ sơ năng lực Công ty TNHH Công nghệ Platinum';
export const records = {
  pages: [
    ['trang-chu', 'Công nghệ cho bài toán doanh nghiệp.', 'Khám phá dịch vụ và sản phẩm của Platinum Technology trong phát triển phần mềm, AI, thiết kế UI/UX, Cloud và DevOps.'],
    ['gioi-thieu', 'Về Platinum Technology', 'Công ty TNHH Công nghệ Platinum', 'Platinum Technology hoạt động tại Huế và có chi nhánh tại Đà Nẵng theo hồ sơ doanh nghiệp. Các lĩnh vực được giới thiệu gồm phát triển phần mềm, AI và AI Agent, thiết kế UI/UX, Cloud và DevOps, đào tạo công nghệ.'],
    ['lien-he', 'Trao đổi nhu cầu của bạn', 'Gửi thông tin về nhu cầu của doanh nghiệp để Platinum tiếp nhận yêu cầu tư vấn.'],
  ],
  services: [
    ['phat-trien-phan-mem', 'Phát triển phần mềm', 'Trao đổi về nhu cầu xây dựng và phát triển phần mềm cho doanh nghiệp.'],
    ['ai-va-ai-agent', 'AI và AI Agent', 'Tìm hiểu hướng ứng dụng trí tuệ nhân tạo và AI Agent cho bài toán của doanh nghiệp.'],
    ['ui-ux', 'Thiết kế UI/UX', 'Trao đổi về giao diện và trải nghiệm người dùng cho sản phẩm số.'],
    ['cloud-devops', 'Cloud và DevOps', 'Trao đổi về hạ tầng đám mây và quy trình vận hành phần mềm.'],
    ['dao-tao-cong-nghe', 'Đào tạo công nghệ', 'Gửi yêu cầu tìm hiểu về nội dung đào tạo công nghệ phù hợp với đội ngũ.'],
  ],
  products: [
    ['linora', 'Linora'], ['linora-erp', 'Linora-ERP'],
    ['linora-ai', 'Linora-AI'], ['platinum-ai-agentic', 'Platinum AI Agentic'],
  ],
  faqs: [
    ['dia-ban', 'Platinum hoạt động ở đâu?', 'Hồ sơ doanh nghiệp nêu địa bàn hoạt động tại Huế và chi nhánh Đà Nẵng.'],
    ['dich-vu', 'Platinum giới thiệu những dịch vụ nào?', 'Phát triển phần mềm, AI và AI Agent, thiết kế UI/UX, Cloud và DevOps, và đào tạo công nghệ.'],
    ['san-pham', 'Platinum có những sản phẩm nào?', 'Hồ sơ liệt kê Linora, Linora-ERP, Linora-AI và Platinum AI Agentic.'],
  ],
};
const profileUpdates = {
  pages: {
    'trang-chu': {
      summary: 'Platinum Technology giới thiệu dịch vụ phát triển phần mềm, AI và AI Agent, thiết kế UI/UX, Cloud và DevOps, cùng đào tạo công nghệ cho doanh nghiệp và tổ chức.',
    },
    'gioi-thieu': {
      body: 'Công ty TNHH Công nghệ Platinum hoạt động dưới tên thương hiệu Platinum Technology. Công ty hoạt động tại Huế và có chi nhánh tại Đà Nẵng.\n\nCác lĩnh vực công nghệ được giới thiệu gồm phát triển phần mềm, AI và AI Agent, thiết kế UI/UX, Cloud và DevOps, và đào tạo công nghệ.\n\nWebsite phục vụ khách hàng doanh nghiệp, tổ chức có nhu cầu phát triển phần mềm hoặc ứng dụng AI, và đối tác công nghệ quan tâm đến việc hợp tác.',
    },
    'lien-he': {
      summary: 'Sử dụng biểu mẫu để gửi yêu cầu tư vấn hoặc trao đổi hợp tác với Platinum Technology.',
      body: 'Địa bàn hoạt động của Platinum gồm Huế và chi nhánh Đà Nẵng.\n\nTrong yêu cầu, bạn có thể nêu lĩnh vực quan tâm và vấn đề doanh nghiệp muốn giải quyết.',
    },
  },
  services: {
    'phat-trien-phan-mem': {
      summary: 'Dành cho doanh nghiệp và tổ chức có nhu cầu xây dựng hoặc phát triển phần mềm.',
      body: 'Khi gửi yêu cầu, hãy mô tả quy trình cần hỗ trợ, nhóm người dùng và mục tiêu của phần mềm. Nếu đã có hệ thống, bạn có thể nêu điểm cần cải thiện hoặc yêu cầu kết nối.',
    },
    'ai-va-ai-agent': {
      summary: 'Trao đổi về nhu cầu ứng dụng trí tuệ nhân tạo và AI Agent trong doanh nghiệp.',
      body: 'Hãy mô tả tác vụ cần hỗ trợ, nguồn thông tin có thể sử dụng và kết quả bạn mong muốn. Ví dụ về đầu vào khi trao đổi là loại tài liệu cần tra cứu hoặc quy trình cần giảm thao tác thủ công.',
    },
    'ui-ux': {
      summary: 'Trao đổi về thiết kế giao diện và trải nghiệm người dùng cho sản phẩm số.',
      body: 'Bạn có thể nêu nhóm người dùng, tác vụ chính và điểm khó sử dụng của giao diện hiện tại. Nếu đang xây dựng sản phẩm mới, hãy mô tả những màn hình hoặc hành trình cần thiết kế.',
    },
    'cloud-devops': {
      summary: 'Trao đổi về hạ tầng đám mây và quy trình triển khai, vận hành phần mềm.',
      body: 'Khi gửi yêu cầu, có thể nêu môi trường đang dùng, cách triển khai hiện tại và vấn đề cần cải thiện trong vận hành.',
    },
    'dao-tao-cong-nghe': {
      summary: 'Trao đổi về nhu cầu đào tạo công nghệ cho đội ngũ.',
      body: 'Hãy cho biết chủ đề quan tâm, nhóm học viên, trình độ hiện tại và kiến thức hoặc kỹ năng muốn đạt được.',
    },
  },
  faqs: {
    'dia-ban': {
      summary: 'Platinum Technology hoạt động tại Huế và có chi nhánh tại Đà Nẵng. Bạn có thể gửi yêu cầu qua trang Liên hệ nếu cần trao đổi trực tiếp.',
    },
  },
};
const extraFaqs = [
  ['ten-cong-ty', 'Tên đầy đủ của Platinum Technology là gì?', 'Tên đầy đủ là Công ty TNHH Công nghệ Platinum. Platinum Technology là tên thương hiệu.'],
  ['doi-tuong', 'Website của Platinum phục vụ những ai?', 'Website phục vụ doanh nghiệp, tổ chức có nhu cầu về công nghệ và đối tác công nghệ quan tâm đến hợp tác.'],
  ['gui-yeu-cau', 'Tôi có thể gửi yêu cầu hợp tác bằng cách nào?', 'Mở trang Liên hệ và gửi biểu mẫu kèm lĩnh vực quan tâm, nhu cầu và thông tin để Platinum có thể liên hệ lại.'],
];

const drafts = {
  pages: [['tam-nhin-su-menh', 'Tầm nhìn và sứ mệnh'], ['doi-ngu', 'Đội ngũ'], ['gia-tri-cot-loi', 'Giá trị cốt lõi'], ['quy-trinh-hop-tac', 'Quy trình hợp tác']],
  projects: [['du-an-cho-bo-sung', 'Dự án chờ bổ sung']],
};
export async function seed() {
  const published = { ...records, faqs: [...records.faqs, ...extraFaqs] };
  for (const [status, groups] of Object.entries({ published, draft: drafts })) {
    for (const [group, entries] of Object.entries(groups)) {
      const operations = entries.map(([slug, title, summary = '', body = ''], order) => ({
        updateOne: { filter: { slug, locale: 'vi' }, update: { $setOnInsert: {
          slug, title, summary, body, source: status === 'published' ? source : '', status, order, locale: 'vi',
          ...(status === 'published' ? profileUpdates[group]?.[slug] : {}),
          createdAt: new Date(), updatedAt: new Date(),
        } }, upsert: true, timestamps: false },
      }));
      await content[group].bulkWrite(operations);
    }
  }
  // Refresh only the original published records. Keep edits and publication decisions from the CMS.
  for (const [group, entries] of Object.entries(profileUpdates)) {
    for (const [slug, changes] of Object.entries(entries)) {
      const [, title, summary = '', body = ''] = records[group].find(entry => entry[0] === slug);
      await content[group].updateOne(
        { slug, locale: 'vi', status: 'published', title, summary, body, source },
        { $set: changes },
      );
    }
  }
}