describe('example', function() {
  it('should check the env var secret', function() {
    expect(process.env.secret).toBe('s3cr3t')
  })
})
