import { VlabSource } from 'src/app/core/sources/vlab.source';

describe('Source', () => {
  it('should create an instance', () => {
    expect(new VlabSource([])).toBeTruthy();
  });
});
